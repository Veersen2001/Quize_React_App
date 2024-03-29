import { useEffect, useState } from "react"
// for sound
import useSound from "use-sound";
import play from '../assets/play.mp3';
import correct from '../assets/correct.mp3';
import wrong from '../assets/wrong.mp3';



export default function Quiz({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {

  const [question,setQuestion] = useState(null);

  const[selectAnswer, setSelectAnswer] = useState(null);
  
  const [className, setClassName] = useState('answer');

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);

  const [wrongAnswer] = useSound(wrong);


  useEffect(()=>{
    letsPlay();
  },[letsPlay]);

  useEffect(()=>{
    setQuestion(data[questionNumber - 1]);
  },[data, questionNumber]);

  const delay = (duration, callback) =>{
     setTimeout(() => {
         callback();
     }, duration);
  }

  const handleClick = (a) =>{
    setSelectAnswer(a);
    setClassName("answer active");

    delay(1000, ()=> 
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );

    delay(5000, () =>{
      
      if(a.correct)
      {
        correctAnswer();//sound
        delay(1000,()=>{
          setQuestionNumber((prev)=>prev+1);
          setSelectAnswer(null);  
        });
      }
      else{
         wrongAnswer();
        delay(1000,()=>{
          setStop(true);
        });
      }
    }
    );


  };

  return (
    <div className="trivia">
        <div className="question">{question?.question}</div>
        <div className="answers">
          {question?.answers.map((a)=>(

            <div className={selectAnswer === a ? className : "answer"} onClick={()=> handleClick(a)}>{a.text}</div>
          ))}

        </div>
    </div>
  )
}
