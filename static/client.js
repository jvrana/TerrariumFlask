import {ApolloLink} from 'apollo-link';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { AUTH_TOKEN } from './src/constants';

// TODO: for production, change to understand cors
const httplink = new HttpLink({
    uri: 'http://0.0.0.0:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errlink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) => {
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
                // alert("graphql errors occured")
            }
        );
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        console.log(networkError)
        alert("a network error occurred")
    }

});

const link = ApolloLink.from([
    authLink,
    errlink,
    httplink
]);


const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

export default client;