import NotFound from 'Components/NotFound/loadable';
import Home from 'Pages/Home/loadable';
import Browse from 'Pages/Browse/loadable';
import MyPokemon from 'Pages/MyPokemon/loadable';
import Leaderboard from 'Pages/Leaderboard/loadable';
import MainLayout from 'Layouts/Main';

const routes = [
  { path: '/', name: 'Home Page', component: Home, layout: MainLayout },
  { path: '/browse', name: 'Browse Page', component: Browse, layout: MainLayout },
  { path: '/leaderboard', name: 'Leaderboard Page', component: Leaderboard, layout: MainLayout },
  { path: '/my-pokemon', name: 'MyPokemon Page', component: MyPokemon, layout: MainLayout },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout },
];

export default routes;
