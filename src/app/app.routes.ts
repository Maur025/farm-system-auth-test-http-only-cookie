import { Routes } from '@angular/router';
import { Loggin } from './loggin/loggin';
import { Home } from './home/home';

export const routes: Routes = [
  {
    title: 'loggin-form',
    path: '',
    component: Loggin,
  },
  {
    title: 'home',
    path: 'home',
    component: Home,
  },
];
