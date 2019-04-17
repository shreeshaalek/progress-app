import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDatepickerModule,MatNativeDateModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatRippleModule, MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule,NoopAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleAuthComponent } from './component/google-auth/google-auth.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HeaderComponent } from './component/header/header.component';
import { HabitPageComponent } from './pages/habit-page/habit-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GoalsPageComponent } from './pages/goals-page/goals-page.component';
import { DailyLogsComponent } from './component/daily-logs/daily-logs.component';
import { AddHabitsComponent } from './component/add-habits/add-habits.component';
import { HabitsListComponent } from './component/habits-list/habits-list.component';
import { AddGoalsComponent } from './component/add-goals/add-goals.component';
import { GoalsListComponent } from './component/goals-list/goals-list.component';
import { AppLogoComponent } from './component/app-logo/app-logo.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import {HelpersService} from './service/helpers.service';
import { ModalDirective } from './utilities/js/modal.directive';
import { LogModalComponent } from './component/log-modal/log-modal.component';



const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatTabsModule
];

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, children:[{
    path: 'habit', component: HabitPageComponent
  },
  {
    path: 'logs', component: DailyLogsComponent
  },
  {
    path: 'goals', component: GoalsPageComponent
  }]},
  { path: '', component: HomepageComponent },
  { path: '**', component: HomepageComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    GoogleAuthComponent,
    HomepageComponent,
    HeaderComponent,
    HabitPageComponent,
    DashboardComponent,
    GoalsPageComponent,
    DailyLogsComponent,
    AddHabitsComponent,
    HabitsListComponent,
    AddGoalsComponent,
    GoalsListComponent,
    AppLogoComponent,
    NavBarComponent,
    ModalDirective,
    LogModalComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NoopAnimationsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    [...modules]
  ],
  providers: [ 
    MatDatepickerModule,  
    HelpersService,
  ],
  entryComponents: [ AddGoalsComponent, AddHabitsComponent, LogModalComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
