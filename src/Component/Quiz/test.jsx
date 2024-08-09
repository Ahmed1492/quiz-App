import { useState } from "react";
import { data } from "../../data";
import "./Quiz.scss";

export const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(data[index]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const checkAnswer = (chosenAnswer) => {
    if (!isAnswered) {
      const correctAnswer = currentQuestion.answer;
      if (chosenAnswer === correctAnswer) {
        setFeedback(true);
        setScore(score + 1);
      } else {
        setFeedback(false);
      }
      setSelectedOption(chosenAnswer);
      setIsAnswered(true);
    }
  };

  const startExamAgain = () => {
    setIndex(0);
    setCurrentQuestion(data[0]);
    setIsAnswered(false);
    setSelectedOption(null);
    setFeedback(null);
    setScore(0);
    setShowScore(false);
  };

  const goToNextQuestion = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setCurrentQuestion(data[index + 1]);
      setIsAnswered(false);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="containerBox">
      <div className="counter">10 Sec</div>
      <div className="question">
        <div className="questionHead">
          <h2>
            Question {index + 1} / {data.length}
          </h2>
          {showScore && <h2>Your Score: {score}</h2>}
          <div className="questionBody">
            <p>{currentQuestion?.questionBody}</p>
          </div>
          <div className="questionMCQ">
            <ul>
              {currentQuestion?.options?.map((option, optionIndex) => (
                <li
                  className={`${
                    selectedOption === option
                      ? feedback === true && option === currentQuestion.answer
                        ? "correctAnswer"
                        : feedback === false && option === selectedOption
                        ? "wrongAnswer"
                        : ""
                      : option === currentQuestion.answer && isAnswered
                      ? "correctAnswer"
                      : ""
                  }`}
                  onClick={() => checkAnswer(option)}
                  key={optionIndex}
                >
                  {option}
                </li>
              ))}
            </ul>
            {isAnswered && (
              <div className="correctAnswer">
                <p>Correct Answer: {currentQuestion.answer}</p>
              </div>
            )}
          </div>
        </div>
        <div className="nextQuestion">
          <button
            className={`${showScore ? "startAgain" : ""}`}
            onClick={showScore ? startExamAgain : goToNextQuestion}
          >
            {showScore ? "Start Again" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
