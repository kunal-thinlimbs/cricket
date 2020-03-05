import React, { useState } from "react";
import {
  Grid,
  Button,
  Dimmer,
  Loader,
  Segment,
  Modal,
  Header,
  Form,
  Card
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import style from "../common/css.js";

import { ALL_USER_QUERY, userMutaion } from "../graphql/graphql.js";
import { Query, Mutation } from "react-apollo";

const Alluser = () => {
  return (
    <Query
      query={ALL_USER_QUERY}
      fetchPolicy="cache-and-network"
      // variables={{
      //   id: empcode //inputs.username,
      // }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div style={{ textAlign: "center" }}>
              <Segment>
                <Dimmer active>
                  <Loader />
                </Dimmer>
              </Segment>
            </div>
          );
        }
        if (error) {
          return <h5 textAlign="center">Somenthg went wrong</h5>;
        }
        if (data) {
          return (
            <div>
              <Header
                as="h1"
                content="All Player"
                style={style.h1}
                textAlign="center"
              />
              <ModalModalExample />
              <Link to={"/"}>
                {" "}
                <Button color="red">Back</Button>
              </Link>
              <Grid container centered>
                {data.getAlluser.map(item => {
                  return (
                    <Grid.Column
                      centered
                      mobile={16}
                      tablet={16}
                      computer={4}
                      widescreen={4}
                    >
                      <Card centered>
                        <img src={item.image} style={{ height: "300px" }} />
                        <Card.Content>
                          <Card.Header style={{ textAlign: "center" }}>
                            {item.title}
                          </Card.Header>

                          <Card.Description style={{ textAlign: "center" }}>
                            Total Matches: {item.matches}
                            <br />
                            Total Runs: {item.runs}
                            <br />
                            Total Catch: {item.catches}
                            <br />
                            Total wickets: {item.wickets}
                            <br />
                            Total century: {item.century}
                            <br />
                            Five wickets in Match: {item.wicket5}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  );
                })}
              </Grid>
            </div>
          );
        }
      }}
    </Query>
  );
};
export default Alluser;

const ModalModalExample = () => {
  const [title, setTitle] = useState("");
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [catches, setCatches] = useState(0);
  const [matches, setMatches] = useState(0);
  const [century, setCentury] = useState(0);
  const [wicket5, setWicket5] = useState(0);
  const [image, setImage] = useState("");

  function handleChange(value, setMethod) {
    console.log("sss", value, setMethod);
    setMethod(value);
    console.log("yyy", image, wickets, catches, matches, century, wicket5);
  }
  return (
    <Grid>
      <Grid.Column
        container
        style={{ textAlign: "center" }}
        mobile={16}
        tablet={16}
        computer={16}
        widescreen={16}
      >
        <Modal
          style={{ margin: "50px" }}
          centered
          style={{ textAlign: "center" }}
          trigger={<Button positive>ADD PLAYER</Button>}
        >
          <Modal.Header>Enter all Details</Modal.Header>
          <br />
          <Grid>
            <Grid.Column
              style={{ textAlign: "center" }}
              mobile={16}
              tablet={16}
              computer={5}
              widescreen={5}
            >
              <Form.Input
                onChange={e => setTitle(e.target.value)}
                label="Name"
                value={title}
                placeholder="Name"
              />
            </Grid.Column>
            <Grid.Column
              container
              style={{ textAlign: "center" }}
              mobile={16}
              tablet={16}
              computer={5}
              widescreen={5}
            >
              <Form.Input
                onChange={e => setImage(e.target.value)}
                label="Image"
                placeholder="Image  URL"
              />
            </Grid.Column>
            <Grid.Column
              container
              style={{ textAlign: "center" }}
              mobile={16}
              tablet={16}
              computer={5}
              widescreen={5}
            >
              <Form.Input
                type="number"
                value={runs}
                onChange={e => setRuns(e.target.value)}
                label="Runs"
                placeholder="Total Runs"
              />
            </Grid.Column>
            <Grid.Column
              container
              style={{ textAlign: "center" }}
              mobile={16}
              tablet={16}
              computer={5}
              widescreen={5}
            >
              <Form.Input
                type="number"
                value={century}
                defaultValue={0}
                onChange={e => setCentury(e.target.value)}
                label="Century"
                placeholder="Total Century"
              />
            </Grid.Column>
            <Grid.Column
              style={{ textAlign: "center" }}
              mobile={16}
              tablet={16}
              computer={5}
              widescreen={5}
            >
              <Form.Input
                type="number"
                value={wickets}
                onChange={e => setWickets(e.target.value)}
                label="Wickets"
                placeholder="Wickets"
              />
            </Grid.Column>
            <Grid.Column
              container
              style={{ textAlign: "center" }}
              mobile={16}
              tablet={16}
              computer={5}
              widescreen={5}
            >
              <Form.Input
                defaultValue={0}
                value={catches}
                type="number"
                onChange={e => setCatches(e.target.value)}
                label="Catches"
                placeholder="Catches"
              />
            </Grid.Column>
            <Grid.Column
              container
              style={{ textAlign: "center" }}
              mobile={16}
              tablet={16}
              computer={5}
              widescreen={5}
            >
              <Form.Input
                defaultValue={0}
                type="number"
                value={wicket5}
                label="Five Wickets"
                onChange={e => setWicket5(e.target.value)}
                placeholder="5+ Five Wickets in match"
              />
            </Grid.Column>
            <Grid.Column
              container
              style={{ textAlign: "center" }}
              mobile={16}
              tablet={16}
              computer={5}
              widescreen={5}
            >
              <Form.Input
                type="number"
                defaultValue={0}
                label="Matches"
                value={matches}
                onChange={e => setMatches(e.target.value)}
                placeholder="Total Matches"
              />
            </Grid.Column>
          </Grid>
          <br />

          <Mutation mutation={userMutaion}>
            {(addTodo, { data }) => {
              return (
                <div>
                  {title != "" &&
                    image != "" &&
                    wickets > -1 &&
                    catches > -1 &&
                    runs > -1 &&
                    matches > -1 &&
                    century > -1 &&
                    wicket5 > -1 && (
                      <Form.Button
                        onClick={() =>
                          addTodo({
                            variables: {
                              title: title,
                              image: image,
                              wickets: parseInt(wickets),
                              catches: parseInt(catches),
                              runs: parseInt(runs),
                              matches: parseInt(matches),
                              century: parseInt(century),
                              wicket5: parseInt(wicket5)
                            },
                            refetchQueries: [
                              {
                                query: ALL_USER_QUERY
                              }
                            ]
                          }).then(item => {
                            alert("User Added");
                          })
                        }
                      >
                        Submit
                      </Form.Button>
                    )}
                </div>
              );
            }}
          </Mutation>
          <br />
        </Modal>
      </Grid.Column>
    </Grid>
  );
};
