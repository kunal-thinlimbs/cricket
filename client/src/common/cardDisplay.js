import React from "react";

import { Card } from "semantic-ui-react";
const CardDisplay = props => {
  return (
    <Card centered>
      <img src={props.value.image} style={{ height: "300px" }} />
      <Card.Content>
        <Card.Header style={{ textAlign: "center" }}>
          {props.value.title}
        </Card.Header>
      </Card.Content>
    </Card>
  );
};

export default CardDisplay;
