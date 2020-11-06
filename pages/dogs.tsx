import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import withApollo from '../lib/withApollo';

type Dog = {
  id: string;
  name: string;
  age: string;
  bio: string;
};

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      name
      age
      bio
    }
  }
`;

type Props = { dogs: Dog[] };

const Dogs: NextPage<Props> = ({ dogs }) => {
  return (
    <div>
      <h1>Dogs:</h1>
      {dogs.map((dog, index) => (
        <ul key={`dog-${index}`}>
          <li>{`name: ${dog.name}`}</li>
          <li>{`age: ${dog.age}`}</li>
          <li>{`bio: ${dog.bio}`}</li>
        </ul>
      ))}
    </div>
  );
};

type ServerSideProps = NextPageContext & { apolloClient: ApolloClient<NormalizedCacheObject> };

type DogsResponse = {
  dogs: Dog[];
};

Dogs.getInitialProps = async ({ apolloClient }: ServerSideProps) => {
  const response = await apolloClient.query<DogsResponse>({
    query: GET_DOGS,
  });

  return {
    dogs: response.data.dogs,
  };
};

export default withApollo({ ssr: true })(Dogs);
