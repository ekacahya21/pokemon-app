import NotFound from 'Components/NotFound/loadable';
import Home from 'Containers/Home/loadable';
import MainLayout from 'Layouts/Main';

const routes = [
  { path: '/', name: 'Home Page', component: Home, layout: MainLayout },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, hideNav: true },
];

export default routes;
