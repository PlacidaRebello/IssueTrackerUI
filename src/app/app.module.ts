import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './Modules/material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChartsModule} from 'ng2-charts';
import { FlexLayoutModule} from '@angular/flex-layout';

import { SprintComponent} from './Components/sprint/sprint.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { IssueTrackerService} from './services/issue-tracker.service';
import { AddEditSprintComponent } from './Components/add-edit-sprint/add-edit-sprint.component';
import { AddEditReleaseComponent } from './Components/add-edit-release/add-edit-release.component';
import { ReusableModalComponent } from './Components/reusable-modal/reusable-modal.component';
import { ReleaseComponent } from './Components/release/release.component';
import { UserService } from './services/user.service';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { JwtInterceptor } from './jwt-interceptor';
import { IssuesComponent } from './Components/issues/issues.component';
import { AddEditIssueComponent } from './Components/add-edit-issue/add-edit-issue.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ManagementDashBoardComponent } from './Components/management-dash-board/management-dash-board.component';
import { RegisterComponent } from './Components/register/register.component';
import { LogOutComponent } from './Components/log-out/log-out.component';

@NgModule({
  declarations: [
    AppComponent,
    SprintComponent,
    NavbarComponent,
    AddEditSprintComponent,
    AddEditReleaseComponent,
    ReusableModalComponent,
    ReleaseComponent,
    LoginFormComponent,
    IssuesComponent,
    AddEditIssueComponent,
    DashboardComponent,
    ManagementDashBoardComponent,
    RegisterComponent,
    LogOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    DragDropModule,
    ChartsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [IssueTrackerService,UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports:[
  ],
  entryComponents:[AddEditSprintComponent,AddEditReleaseComponent,AddEditIssueComponent,ReusableModalComponent]
})
export class AppModule { }
