import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
    {
        path: '',
        component: PlacesPage,
        children: [
            {
                path: 'discover',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./discover/discover.module').then((m) => m.DiscoverPageModule),
                    },
                ],
            },
            {
                path: 'offers',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./offers/offers.module').then((m) => m.OffersPageModule),
                    },
                ],
            },
            {
                path: '',
                redirectTo: '/places/discover',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/places/discover',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
