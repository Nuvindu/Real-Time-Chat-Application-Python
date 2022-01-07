import React from "react";
import ReactDOM from "react-dom";
// import * as React from 'react'
import { WebSocketLink } from '@apollo/client/link/ws';
import { 
    FormInput,
    Row,
    Col,
    Button, 
} from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import {
    Container,
  } from '@chakra-ui/react'

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useSubscription,
    useMutation,
    gql
  } from "@apollo/client";


const link = new WebSocketLink({
    uri: 'ws://localhost:8000/',
    options: {
        reconnect: true
    }
});
const client = new ApolloClient({
    link,
    uri: 'http://localhost:8000/',
    cache: new InMemoryCache()
});
const LOAD_MESSAGES = gql`
query {
  messages {
    id
    content
    user
  }
}
`;
const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      user
    }
  }
`;
const POST_MESSAGE = gql`
mutation {
  postMessage(user: "Jack", content: "Hello"){
    id
    user
    content
    
  }
}
`;

  
const Messages = ({user}) => {
    // const {data} = useQuery(LOAD_MESSAGES);
    const {data} = useSubscription(GET_MESSAGES);   
    if(!data){
        return null;
    }
    return (
        <>
        {data.messages.map(({ id, user: messageUser, content }) => (
          <div
            style={{
              display: "flex",
              justifyContent: user === messageUser ? "flex-end" : "flex-start",
              paddingBottom: "1em",
            }}
          >
            {user !== messageUser && (
              <div
                style={{
                  height: 50,
                  width: 50,
                  marginRight: "0.5em",
                  border: "2px solid #e5e6ea",
                  borderRadius: 25,
                  textAlign: "center",
                  fontSize: "14pt",
                  paddingTop: 5,
                }}
              >
                {messageUser.slice(0,4)}
              </div>
            )}
            <div
              style={{
                background: user === messageUser ? "blue" : "#e5e6ea",
                color: user === messageUser ? "white" : "black",
                padding: "1em",
                borderRadius: "1em",
                maxWidth: "60%",
              }}
            >
              {content}
            </div>
          </div>
        ))}
      </>
    );
};


const Chat = () => {
    const [state, stateSet] = React.useState({
      user: "Jack",
      content: "",
    });
    const [postMessage] = useMutation(POST_MESSAGE);
  
    const onSend = () => {
      console.log(state.content)
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }
    stateSet({
      ...state,
      content: "",
    });
  };
  return (
    <Container>
      <Messages user={state.user} />
      <Row>
        <Col xs={2} style={{ padding: 0 }}>
          <FormInput
            label="User"
            value={state.user}
            onChange={(evt) =>
              stateSet({
                ...state,
                user: evt.target.value,
              })
            }
          />
        </Col>
        <Col xs={8}>
          <FormInput
            label="Content"
            value={state.content}
            onChange={(evt) =>
              stateSet({
                ...state,
                content: evt.target.value,
              })
            }
            onKeyUp={(evt) => {
              if (evt.keyCode === 13) {
                onSend();
              }
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button onClick={() => onSend()} style={{ width: "100%" }}>
            Send
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default () => (
    <ApolloProvider client={client} >
        <h1 style={{
              textAlign: "center",
            }} >Real-Time Chat Application</h1>
        <br/>
        <br/>
        <br/>
        <Chat />
    </ApolloProvider>
);
