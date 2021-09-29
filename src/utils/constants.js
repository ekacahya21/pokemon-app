export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_AUTH_MODAL = 'SET_AUTH_MODAL';
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
    path: '/browse',
  },
  {
    label: 'My Pokemon',
    image: '/src/static/images/vector/backpack.svg',
    path: '/my-pokemon',
    protected: true,
  },
];
