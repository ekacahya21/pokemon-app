export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_AUTH_MODAL = 'SET_AUTH_MODAL';
export const SET_PROFILE_INFO = 'SET_PROFILE_INFO';
export const SET_AUTH_MODAL_MODE = 'SET_AUTH_MODAL_MODE';

export const DEFAULT_LOCALE = 'en';
export const NAVIGATION_MENU = [
  {
    label: 'Leaderboard',
    image: '/src/static/images/vector/up-arrow.svg',
    path: '/leaderboard',
  },
  {
    label: 'Browse',
    image: '/src/static/images/vector/pokeball.svg',
    path: '/',
  },
  {
    label: 'My Pokemon',
    image: '/src/static/images/vector/backpack.svg',
    path: '/my-pokemon',
    protected: true,
  },
];
