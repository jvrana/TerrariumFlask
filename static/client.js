import {ApolloLink} from 'apollo-link';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import { backend_url } from './server.config.js'

// TODO: for production, change to understand cors
const httplink = new HttpLink({
    uri: 'http://localhost:5000/graphql',
});
const errlink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) => {
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
                alert("graphql errors occured")
            }
        );
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        console.log(networkError)
        alert("a network error occurred")
    }

});

const link = ApolloLink.from([
    errlink,
    httplink
]);


const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

export default client;