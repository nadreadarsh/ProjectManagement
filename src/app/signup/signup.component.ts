import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SignupServiceService } from '../signup-service.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule,RouterOutlet,RouterLink,RouterModule],
  providers:[SignupServiceService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
saveuser() {
throw new Error('Method not implemented.');
}
  form:FormGroup=new FormGroup(
    {    
      username:new FormControl(''),
      password:new FormControl(''),
      confirmPassword:new FormControl(''),
      email:new FormControl(''),
      contact:new FormControl(''),
      address:new FormControl(''),
      acceptTerms:new FormControl(false)
    }
  )
  submitted=false
  userForm!: FormGroup<any>;
isFormSubmitted: any;
 
  constructor(private fb:FormBuilder,private myclint:SignupServiceService , private router:Router,private route: ActivatedRoute ){
    
  }

  get f():{[key:string]:AbstractControl}{
    return this.form.controls
  }
  ngOnInit(): void {
    
      this.form=this.fb.group(
        {
          
          username:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)],],
          email:['',[Validators.required,Validators.email],],
          password:['',[Validators.required,Validators.minLength(6)],Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/)],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
          contact:['',[Validators.required, Validators.minLength(10)]],
         address: ['',Validators.required,],
          acceptTerms:[false,Validators.requiredTrue]
        }, { validators: this.checkPasswords })


  }
  checkPasswords(group: AbstractControl) {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { notMatched: true };
  }

  OnSubmit()
  {     this.submitted=true
       if(this.form.invalid)
       {
        return
       }
       else{
        let user = this.form.value;
        this.myclint. saveUser(user).subscribe(result => {})
      }
      this.router.navigate(['/login']);

  }
  OnReset()
  {
    this.form.reset()
    this.submitted=false
  }

}
