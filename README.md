# Real-Time-Chat-Application-Python

<br/>

### Server


Install Python and setup the virtual environment

Install ariadne and uvicorn libraries

```python
pip install ariadne "uvicorn[standard]"
```

To activate the virtual environment, type the following command in the terminal.

```cmd
.\real-time\Scripts\Activate.ps1
```

If you want to leave the virtual environment, type *deactivate*

<br/>

### Client

If yarn package is not yet installed, refer the this [link](https://classic.yarnpkg.com/lang/en/docs/install) to install it.


Create new package: 
```javascript 
yarn init -y 
```

Apollo Client: 
```javascript
yarn add @apollo/client graphql 
```

Chakra UI: 
```javascript
yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^5 
 ```

WebSocket: 
```javascript
yarn add subscriptions-transport-ws 
 ```

Shrads React: 
```javascript
yarn add shards-react 
```

<br/>

### Guide

Enter to the server folder and activate the virtual environment if you haven't.

```cmd
.\real-time\Scripts\Activate.ps1
```

run the server 
```python
uvicorn app:app
```

While the server running, create another terminal and enter to the client folder and start the React app

```javascript
yarn start 
```


<br/>

### References 

<br/>

https://www.twilio.com/blog/graphql-api-subscriptions-python-asyncio-ariadne

https://www.apollographql.com/blog/graphql/python/complete-api-guide

https://ariadnegraphql.org/docs/intro#completed-code

https://github.com/mirumee/ariadne

