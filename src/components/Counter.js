import React from "react";
import styled from "styled-components";

const Track = styled.div`
  height: 20px;
  margin: 0 auto;
  background-color: #e0e0e0;
`;

const Thumb = styled.div`
  width: ${100 / 11}%;
  height: 100%;
  background-color: #cc1414;
  transition: width 0.3s ease-in;
  margin: 0.5rem;
  height: 1rem;
`;

const Counter = (props) => {
  const { setView, wrongAnswer, round } = props ;
  //Seconds Counter
  const [counter, setCounter] = React.useState(10); // counter is 11 seconds
  // const [percentage, setPercentage] = React.useState(0);


  const [thumbs, setThumbs] = React.useState(
    [
      <Thumb key={0} />,
      <Thumb key={1}/>,
      <Thumb key={2}/>,
      <Thumb key={3}/>,
      <Thumb key={4}/>,
      <Thumb key={5}/>,
      <Thumb key={6}/>,
      <Thumb key={7}/>,
      <Thumb key={8}/>,
      <Thumb key={9} />,
    ]
  );

  React.useEffect(() => {
    if (counter <= 0 && round === 3) {
      wrongAnswer();
    } else if (counter <= 0) {
      setView("grid");
    }
  },[counter, round, setView, wrongAnswer])

  React.useEffect(() => {
    const timer = setInterval(() => {
        setCounter(counter - 1);
        setThumbs(thumbs.slice(0, thumbs.length-1));
      }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <>
      <Track
        style={{ display: "flex", justifyContent: "center", height: "2rem" }}
      >
        {thumbs}
      </Track>
    </>
  );
};

export default Counter;
