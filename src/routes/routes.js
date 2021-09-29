import NotFound from 'Components/NotFound/loadable';
import Pokemon from 'Pages/Pokemon';
import Browse from 'Pages/Browse/loadable';
import MyPokemon from 'Pages/MyPokemon/loadable';
import Leaderboard from 'Pages/Leaderboard/loadable';
import MainLayout from 'Layouts/Main';

const routes = [
  { path: '/', name: 'Browse Page', component: Browse, layout: MainLayout },
  { path: '/pokemon/:id', name: 'Pokemon Detail Page', component: Pokemon, layout: MainLayout },
  { path: '/leaderboard', name: 'Leaderboard Page', component: Leaderboard, layout: MainLayout },
  { path: '/my-pokemon', name: 'MyPokemon Page', component: MyPokemon, layout: MainLayout },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout },
];

export default routes;
