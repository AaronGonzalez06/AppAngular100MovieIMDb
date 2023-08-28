import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StartComponent } from "./components/start/start.component";
import { PendingComponent } from "./components/pending/pending.component";
import { SeenComponent } from "./components/seen/seen.component";
const appRoutes: Routes = [
    {path: '', component: StartComponent},
    {path: 'Home', component: StartComponent},
    {path: 'Pending', component: PendingComponent},
    {path: 'Seen', component: SeenComponent},
    {path: '**', component: StartComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);