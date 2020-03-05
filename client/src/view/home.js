import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import Comp from "../compare.png";
import All from "../ALL.png";
import { Link } from "react-router-dom";
import style from "../common/css.js";
export default function Home() {
  return (
    <div>
      <Header
        as="h1"
        content="Its A Gentleman's Games"
        style={style.h1}
        textAlign="center"
      />

      <Grid container centered>
        <Grid.Column
          centered
          mobile={16}
          tablet={16}
          computer={8}
          widescreen={8}
        >
          <Segment style={{ textAlign: "center" }}>
            <Link to={"/allplayer"}>
              {" "}
              <img src={All} height="400px" />
            </Link>
          </Segment>
        </Grid.Column>
        <Grid.Column
          centered
          mobile={16}
          tablet={16}
          computer={8}
          widescreen={8}
        >
          <Segment style={{ textAlign: "center" }}>
            <Link to={"/compare"}>
              <img src={Comp} height="400px" />
            </Link>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}
