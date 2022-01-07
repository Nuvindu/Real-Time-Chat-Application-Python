  Mutation has to be provided manually :(
  
  ```GraphQL
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content){
      id
      user
      content
      
    }
  }
```

  query variables - 

```GraphQL  
{
  "user": "Pam",
  "content": "Hi"
}
```