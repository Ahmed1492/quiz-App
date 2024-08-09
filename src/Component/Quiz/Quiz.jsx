import { useState } from "react";
import { data } from "../../data";
import "./Quiz.scss";
export const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuistion] = useState(data[index]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isAnswerd, setIsAnswerd] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);
  let isCorrect;
  const checkAnswer = (choosedAnswer, index, e) => {
    if (!isAnswerd) {
      if (currentQuestion.answer === choosedAnswer) {
        setFeedback(true);
        setSelectedOption(choosedAnswer);
        setScore(score + 1);
        isCorrect = true;
      } else {
        setSelectedOption(choosedAnswer);
        setFeedback(false);
        isCorrect = false;
      }
      setIsAnswerd(true);
      const newObj = {
        qeustion: currentQuestion.questionBody,
        YourAnswer: choosedAnswer,
        feedback: isCorrect,
      };
      const newArr = [...allAnswers];
      newArr.push(newObj);
      setAllAnswers(newArr);
    }
  };

  const startExamAgain = () => {
    setIndex(0);
    setCurrentQuistion(data[0]);
  };

  const goToNextQuestion = () => {
    console.log(isCorrect);

    if (index === data.length) {
      startExamAgain();
    } else {
      if (selectedOption !== null) {
        if (data.length === index) {
          setShowScore(true);
        } else {
          setIndex(index + 1);
          setCurrentQuistion(data[index + 1]);
          setIsAnswerd(false);
        }
      }
      // console.log(showScore);
    }
  };
  return (
    <div className="containerBox">
      <div className="counter">10 Sec</div>
      <div className="question">
        <div className="questionHead">
          <h2>
            Question {index + 1 > data.length ? index : index + 1} /
            {data.length}
          </h2>
          {data.length === index && <h2>Your Score : ( {score} ) </h2>}
          {data.length == index &&
            allAnswers.map((myAnswer) => (
              <div className="result">
                <p className="question">Question : {myAnswer.qeustion}</p>
                <p className={`answer ${myAnswer.feedback == true ? 'correctAnswer2' : 'wrongAnswer2'}`}>
                  Your Answer : {myAnswer.YourAnswer}
                </p>
                <hr />
              </div>
            ))}

          <div className="questionBody">
            <p>{currentQuestion?.questionBody}</p>
          </div>
          <div className="questionMCQ">
            <ul>
              {currentQuestion?.options?.map((option, index) => (
                <li
                  className={`${
                    selectedOption === option
                      ? feedback === true && option === currentQuestion.answer
                        ? "correctAnswer"
                        : feedback === false && option === selectedOption
                        ? "wrongAnswer"
                        : ""
                      : option === currentQuestion.answer && isAnswerd
                      ? "correctAnswer"
                      : ""
                  }`}
                  onClick={() => checkAnswer(option, index)}
                  key={index}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`nextQuestion `}>
          <button
            className={`${data.length === index && "startAgain"}`}
            onClick={goToNextQuestion}
          >
            {index === data.length ? "Start Again" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
