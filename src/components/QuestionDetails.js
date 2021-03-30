import React, { PureComponent } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Row,
  Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import User from './User';
import { handleAnswer } from '../actions/shared';

class QuestionDetails extends PureComponent {
  state = {
    selectedOption: '',
  };

  radioSelected = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  };

  render() {
    const {
      question,
      questionAuthor,
      answer,
      total,
      percentageOne,
      percentageTwo,
    } = this.props;
    const { selectedOption } = this.state;

    return (
      <Row>
        <Col sm='12' md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <User id={questionAuthor.id} />
            </CardHeader>
            <CardBody>
              <CardTitle>Would You Rather</CardTitle>
              {answer ? (
                <div>
                  <FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input type='radio' checked={answer === 'optionOne'} />
                        {'  '}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input type='radio' checked={answer === 'optionTwo'} />
                        {'  '}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <div className='progress'>
                    <div
                      className='progress-one'
                      style={{ width: `${percentageOne}%` }}
                    >{`${parseFloat(percentageOne).toFixed(2)}%`}</div>
                    <div
                      className='progress-two'
                      style={{ width: `${percentageTwo}%` }}
                    >{`${parseFloat(percentageTwo).toFixed(2)}%`}</div>
                  </div>
                  <div className='total'>Total number of votes: {total}</div>
                </div>
              ) : (
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup tag='fieldset'>
                    <FormGroup>
                      <Label>
                        <Input
                          type='radio'
                          name='radio1'
                          value='optionOne'
                          onChange={this.radioSelected}
                        />{' '}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        <Input
                          type='radio'
                          name='radio1'
                          value='optionTwo'
                          onChange={this.radioSelected}
                        />{' '}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <Button disabled={selectedOption === ''}>Submit</Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const answers = users[authedUser].answers;
  let answer, percentageOne, percentageTwo, total;
  const { id } = match.params;
  const question = questions[id];
  if (answers.hasOwnProperty(question.id)) {
    answer = answers[question.id];
  }
  const questionAuthor = users[question.author];
  let questionOneTotal = question.optionOne.votes.length;
  let questionTwoTotal = question.optionTwo.votes.length;

  total = questionOneTotal + questionTwoTotal;
  percentageOne = (questionOneTotal / total) * 100;
  percentageTwo = (questionTwoTotal / total) * 100;
  return {
    question,
    questionAuthor,
    answer,
    total,
    percentageOne,
    percentageTwo,
  };
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: (answer) => {
      dispatch(handleAnswer(id, answer));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
