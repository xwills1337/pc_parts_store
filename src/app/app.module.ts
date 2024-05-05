import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainComponent } from './pages/main/main.component';
import { MonitorsComponent } from './pages/monitors/monitors.component';
import { ProcessorsComponent } from './pages/processors/processors.component';
import { VideoCardsComponent } from './pages/video-cards/video-cards.component';
import { DrivesComponent } from './pages/drives/drives.component';
import { DevicesComponent } from './pages/devices/devices.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'monitors', component: MonitorsComponent},
  {path: 'processors', component: ProcessorsComponent},
  {path: 'video_cards', component: VideoCardsComponent},
  {path: 'drives', component: DrivesComponent},
  {path: 'devices', component: DevicesComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainComponent,
    MonitorsComponent,
    ProcessorsComponent,
    VideoCardsComponent,
    DrivesComponent,
    DevicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
