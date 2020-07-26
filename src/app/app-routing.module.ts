import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SprintComponent } from './Components/sprint/sprint.component';
import { AddEditSprintComponent } from './Components/add-edit-sprint/add-edit-sprint.component';
import { ReleaseComponent } from './Components/release/release.component';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { IssuesComponent } from './Components/issues/issues.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ManagementDashBoardComponent } from './Components/management-dash-board/management-dash-board.component';
import { RegisterComponent } from './Components/register/register.component';
import { ReusableModalComponent } from './Components/reusable-modal/reusable-modal.component';
import { LogOutComponent } from './Components/log-out/log-out.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {path:"Sprints",component:SprintComponent,canActivate:[AuthGuard]},
  {path:"AddEditSprints",component:AddEditSprintComponent},
  {path:"Release",component:ReleaseComponent,canActivate:[AuthGuard]},
  {path:"Issues",component:IssuesComponent,canActivate:[AuthGuard]},
  {path:"Login",component:LoginFormComponent},
  {path:"Dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  {path:"Management",component:ManagementDashBoardComponent,canActivate:[AuthGuard]},
  {path:"Register", component:RegisterComponent},  
  {path:"Reusable", component:ReusableModalComponent}, 
  {path:"LogOut", component:LogOutComponent},  
  {path: '', redirectTo: '/Login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
