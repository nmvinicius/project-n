import { Routes } from '@angular/router';
import { PlayerComponent } from './pages/player/player.component';
import { MakerComponent } from './pages/maker/maker.component';
import { RootComponent } from './pages/root/root.component';
import { authGuard } from './services/auth.guard';
import { playerGuard } from './services/player.guard';
import { makerGuard } from './services/maker.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', component: RootComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'player', component: PlayerComponent, canActivate: [authGuard, playerGuard] },
    { path: 'maker', component: MakerComponent, canActivate: [authGuard, makerGuard] }
];
