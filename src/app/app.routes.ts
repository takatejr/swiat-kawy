import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ONas } from './o-nas/o-nas';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'o-nas', component: ONas }
];
