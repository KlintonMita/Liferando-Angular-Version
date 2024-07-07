import { Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { WebStructureComponent } from '../web-structure/web-structure.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'web', component: WebStructureComponent}
];
