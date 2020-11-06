import fetch from 'isomorphic-unfetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { NormalizedCacheObject } from '@apollo/client';

const createHttpLink = (): HttpLink => {
  const httpLink = new HttpLink({
    uri: `https://${process.env.NEXT_PUBLIC_API_HOST}`,
    credentials: 'include',
    fetch,
  });
  return httpLink;
};

const createWSLink = (): WebSocketLink => {
  return new WebSocketLink(
    new SubscriptionClient(`wss://${process.env.NEXT_PUBLIC_API_HOST}`, {
      lazy: true,
      reconnect: true,
    }),
  );
};

export default function createApolloClient(initialState: NormalizedCacheObject) {
  const ssrMode = typeof window === 'undefined';
  let link;
  if (ssrMode) {
    link = createHttpLink();
  } else {
    link = createWSLink();
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}
