import React from 'react';
import { useRouter } from 'next/router';

const Dog = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h2>{`Dog: ${id}`}</h2>
    </div>
  );
};

export default Dog;
