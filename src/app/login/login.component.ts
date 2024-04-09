import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { FormBuilder, FormGroup,FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SignupServiceService } from '../signup-service.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterOutlet, SignupComponent,
           RouterLink, ReactiveFormsModule,HttpClientModule],
  providers:[SignupServiceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  isFormSubmitted:boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: SignupServiceService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response: any) => {
         
          if (response.userRole === 'user') {
            this.router.navigate(['/createproject']);
          } else if (response.userRole === 'manager') {
            this.router.navigate(['/createproject']);
          } else {
           
          }
        },
        (error: any) => {
          console.log(error);
          if (error.status === 404) { 
            alert("User not found. Please register...");
          }else if (error.status === 401) { 
            alert("Incorrect password...")
          }  else {
            
          }
        }
      );
    }
  }
}
