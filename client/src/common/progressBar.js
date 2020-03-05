import { Icon, Progress } from "semantic-ui-react";
import React from "react";
const ProgressBar = props => {
  return (
    <p>
      <b>
        {props.title} {props.Player1}
      </b>
      <br />
      {props.view == "ICON" && (
        <React.Fragment>
          {props.Player1 === props.Player2 ? (
            <Icon circular inverted color="yellow" name="thumbs up" />
          ) : props.Player1 > props.Player2 ? (
            <Icon circular inverted color="green" name="thumbs up" />
          ) : (
            <Icon circular inverted color="red" name="thumbs down" />
          )}
        </React.Fragment>
      )}
      {props.view == "BAR" && (
        <Progress
          percent={100}
          active
          color={
            props.Player1 === props.Player2
              ? "yellow"
              : props.Player1 > props.Player2
              ? "green"
              : "red"
          }
        ></Progress>
      )}
    </p>
  );
};

export default ProgressBar;
