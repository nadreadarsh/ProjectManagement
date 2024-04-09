import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectListingComponent } from './project-listing/project-listing.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'create-project',component:CreateProjectComponent},
    {path:'project-listing',component:ProjectListingComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'', redirectTo:'/login',pathMatch:'full'},
       
];
