import React from "react";
import styled from "styled-components";

const Track = styled.div`
  height: 2rem;
  margin: 0 auto;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
`;

const Thumb = styled.div`
  width: ${100 / 9}%;
  @media (max-width: 768px) {
    width: ${100 / 13}%;
  }
  height: 100%;
  background-color: #cc1414;
  transition: width 0.3s ease-in;
  margin: 0.5rem;
  height: 1rem;
`;

const ThumbHard = styled.div`
  width: ${100 / 12}%;
  @media (max-width: 768px) {
    width: ${100 / 15}%;
  }
  height: 100%;
  background-color: #cc1414;
  transition: width 0.3s ease-in;
  margin: 0.5rem;
  height: 1rem;
`;

const Counter = (props) => {
  const { setView, wrongAnswer, round, hard } = props ;
  //ten seconds is counted before the question is skipped on easy

  const [counter, setCounter] = React.useState(hard ? 29 : 14);

  const [thumbs, setThumbs] = React.useState(!hard ?
    [
      <Thumb key={0} />,
      <Thumb key={1} />,
      <Thumb key={2} />,
      <Thumb key={3} />,
      <Thumb key={4} />,
      <Thumb key={5} />,
      <Thumb key={6} />,
      <Thumb key={7} />,
      <Thumb key={8} />,
    ]:
    [
      <ThumbHard key={0} />,
      <ThumbHard key={1} />,
      <ThumbHard key={2} />,
      <ThumbHard key={3} />,
      <ThumbHard key={4} />,
      <ThumbHard key={5} />,
      <ThumbHard key={6} />,
      <ThumbHard key={7} />,
      <ThumbHard key={8} />,
      <ThumbHard key={9} />,
      <ThumbHard key={10} />,
    ])

  React.useEffect(() => {
    if (counter <= 1 && round === 3) {
      wrongAnswer();
    } else if (counter <= 1) {
      document.getElementById("wrong-sound").play();
      setView("grid");
    }
  },[counter, round, setView, wrongAnswer])

  React.useEffect(() => {
    const timer = setInterval(() => {
        setCounter(counter - 1);
        if(hard){
          if (counter % 5 === 0) {
            setThumbs(thumbs.slice(0, thumbs.length - 2));
          }
        }else{
          if (counter % 3 === 0) {
            setThumbs(thumbs.slice(0, thumbs.length - 2));
          }
        }
      }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <>
      <Track
      >
        {thumbs}
      </Track>
    </>
  );
};

export default Counter;
