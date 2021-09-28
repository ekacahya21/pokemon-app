import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_USERS } from '../../graphQL/queries';

const Leaderboard = () => {
  const { data } = useQuery(GET_USERS);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(data);
  }, [data]);

  return (
    <div>
      <h1>Hi from Leaderboard</h1>
    </div>
  );
};

export default Leaderboard;
