import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { _MatInternalFormField } from '@angular/material/core';
import { CreateProjectComponent } from './create-project/create-project.component';
import { LoginComponent } from './login/login.component';
import { ProjectListingComponent } from './project-listing/project-listing.component';
import { DashboardComponent } from './dashboard/dashboard.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CreateProjectComponent,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,SignupComponent,    
    FormsModule,LoginComponent,ProjectListingComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TechPrimLab';
}
