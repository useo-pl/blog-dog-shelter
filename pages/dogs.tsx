import { gql, useQuery } from '@apollo/client';
import React from 'react';

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

type DogsResponseData = {
  dogs: Dog[];
};

const Dogs = () => {
  const { loading, error, data } = useQuery<DogsResponseData>(GET_DOGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Dogs:</h1>
      {data.dogs.map((dog, index) => (
        <ul key={`dog-${index}`}>
          <li>{`name: ${dog.name}`}</li>
          <li>{`age: ${dog.age}`}</li>
          <li>{`bio: ${dog.bio}`}</li>
        </ul>
      ))}
    </div>
  );
};

export default Dogs;
