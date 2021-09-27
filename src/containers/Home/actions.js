import { LOAD_POKEMONS, SET_LOADING } from './constants';

export const loadPokemon = () => ({
  type: LOAD_POKEMONS,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});
