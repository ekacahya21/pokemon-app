import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { orderBy, isEmpty } from 'lodash';

import Loader from 'Components/Loader';
import Card from 'Components/Card';
import PokemonCard from 'Components/PokemonCard/loadable';
import { AppContext } from 'Utils/StoreProvider';

import { GET_PROFILE, GET_USERS_POKEMONS } from '../../graphQL/queries';
import { toTitlecase } from '../../utils/helpers';
import classes from './style.scss';

const Leaderboard = () => {
  const [state] = useContext(AppContext);
  const [userPokemonData, setUserPokemonData] = useState([]);
  const { error, data, loading } = useQuery(GET_USERS_POKEMONS);
  const [getProfile, { data: profileData }] = useLazyQuery(GET_PROFILE);

  useEffect(() => {
    if (state.isAuthenticated && isEmpty(state.profileInfo)) {
      getProfile();
    }
    if (data && data.users) {
      const sorted = orderBy(data.users, (user) => user.catchedPokemons, 'desc');
      setUserPokemonData(sorted);
    }
  }, [data, profileData]);

  if (error) {
    toast.error(error.message, { position: 'top-right' });
  }

  return (
    <div className={classes.leaderboardWrapper}>
      <div className={classes.header}>
        <div className={classes.title}>
          <strong>
            <FormattedMessage id="leaderboard_title" />
          </strong>
        </div>
        <div className={classes.subtitle}>
          <FormattedMessage id="leaderboard_subtitle" />
        </div>
      </div>
      <div className={classes.content}>
        {userPokemonData.map((user, key) => {
          const currentUser = profileData && profileData.getProfile._id === user._id;
          return (
            user.catchedPokemons.length > 0 && (
              <Card className={`${classes.userWrapper} ${currentUser ? classes.currentUser : ''}`} key={`user_${key}`}>
                <div className={classes.username}>{`${toTitlecase(
                  currentUser ? 'your' : user.username
                )}'s Collections`}</div>
                <div className={classes.catchedPokemon}>
                  {user.catchedPokemons.map((pokemon, index) => (
                    <PokemonCard pokemon={pokemon.detail} mini key={`pokemon_${index}`} />
                  ))}
                </div>
              </Card>
            )
          );
        })}
      </div>
      <Loader isLoading={loading} />
    </div>
  );
};

export default Leaderboard;
