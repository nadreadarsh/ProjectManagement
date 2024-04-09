import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { SignupServiceService } from '../signup-service.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../Models/user';
import { ProjectReason } from '../Models/project-reason';
import { ProjectType } from '../Models/project-type';
import { ProjectDivision } from '../Models/project-division';
import { ProjectCategory } from '../Models/project-category';
import { ProjectPriority } from '../Models/project-priority';
import { ProjectDept } from '../Models/project-dept';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { ProjectStatus } from '../Models/project-status';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProjectLocation } from '../Models/project-location';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule,RouterOutlet,RouterModule,FormsModule, ReactiveFormsModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  providers: [SignupServiceService, ApiService],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {

 
  filteredUsers: User[] = [];
  projectForm!: FormGroup;
  projectName!: String;
  userlist: User[] = [];
  reasonList: ProjectReason[] = [];
  typesList: ProjectType[] = [];
  divList: ProjectDivision[] = [];

  categoryList: ProjectCategory[] = [];
  priorityList: ProjectPriority[] = [];
  depList: ProjectDept[] = [];
  locationList: ProjectLocation[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  
  status: string ="Registered";
  selectedUsers: number[] | null= null;
  // selectedReason: Reasons =new Reasons(1,"");
  // selectedType: Type =new Type(1,"");
  // selectedDivision: Division =new Division(1,"");
  // selectedCategorie: Category =new Category(1,"");
  // selectedPrioritie: Priority =new Priority(1,"");
  // selectedDepartment: Department =new Department(1,"");
  // selectedLocation: Location =new Location(1,"");
  status1:ProjectStatus=new ProjectStatus(1,"registered");
  // selectedStartDate: any;
  // selectedEndDate: any;

  constructor(
    private fb: FormBuilder,
    private projectService: ApiService,
    private snackBar: MatSnackBar,
    public serv: SignupServiceService,
    public router :Router,
    
    


  ) { }

  saveRecord(e: { target: { value: any; }; }) {
    console.log(e.target.value)
  }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchUsersFromAPI();
    this.fetchReasonsFromAPI();
    this.fetchTypeFromAPI();
    this.fetchDivisionFromAPI();
    this.fetchCategoryFromAPI();
    this.fetchPriorityFromAPI();
    this.fetchDepartmentFromAPI();
    this.fetchLocationFromAPI();
  }

  initializeForm(): void {
    this.projectForm = this.fb.group({
      project_name: ['', Validators.required],
      selectedUsers: [[]],
      reason: ['', Validators.required],
      type: ['', Validators.required],
      division: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      department: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required,this.endDateValidator()],
      location: ['', Validators.required]
    });
  }


  SelectedUsersForm(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedUserIds: number[] = [];
    
    for (let i = 0; i < target.options.length; i++) {
      const option = target.options[i];
     
      if (option.selected) {

     
        const valueParts = option.value.split(':'); // Split by colon
        const userId = parseInt(valueParts[1].trim(), 10); // Parse the first part (user ID)
        selectedUserIds.push(userId);

        //selectedUserIds.push(parseInt(option.value, 10));
      }
    }
  
    this.selectedUsers = selectedUserIds;
    
  }
fetchUsersFromAPI(): void {
  this.serv.getUser().subscribe(data => {
    this.userlist = data;
  });
}


  fetchReasonsFromAPI(): void {
    this.projectService.getAllReasons().subscribe(data => {
      this.reasonList = data;
    }
    );
  }

  fetchTypeFromAPI(): void {
    this.projectService.getAllType().subscribe(data => {
      this.typesList = data;
    });
  }

  fetchDivisionFromAPI(): void {
    this.projectService.getAllDivisions().subscribe(data => {
      this.divList = data;
    });
  }

  fetchCategoryFromAPI(): void {
    this.projectService.getAllCategory().subscribe(data => {
      this.categoryList = data;
    });
  }

  fetchPriorityFromAPI(): void {
    this.projectService.getAllPriority().subscribe(data => {
      this.priorityList = data;
    });
  }
  fetchDepartmentFromAPI(): void {
    this.projectService.getAllDepartment().subscribe(data => {
      this.depList = data;
    });
  }

  fetchLocationFromAPI(): void {
    this.projectService.getAllLocation().subscribe(data => {
      this.locationList = data;
    });
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      console.log("hiii",projectData)

      const type = this.projectForm.get('type')?.value;
      console.log('Type:', type);

      delete projectData.id;
      projectData.reason = this.getReasonObject(projectData.reason);      
      projectData.type = this.getTypeObject(this.projectForm.get('type')?.value);
      console.log("22222",projectData.type)
      projectData.division = this.getDivisionObject(projectData.division);
      projectData.category = this.getCategoryObject(projectData.category);
      projectData.priority = this.getPriorityObject(projectData.priority);
      projectData.department = this.getDepartmentObject(projectData.department);
      projectData.location = this.getLocationObject(projectData.location);
      projectData.status = this.status1;
      projectData.startDate = this.projectForm.get('startDate')?.value;
      projectData.endDate = this.projectForm.get('endDate')?.value;
      
      // Assuming selectedUsers is an array of user IDs
      const selectedUserIds = this.projectForm.get('selectedUsers')?.value;
      if (selectedUserIds && selectedUserIds.length > 0) { 
        const selectedUsers = this.userlist.filter(user => selectedUserIds.includes(user.id));
        projectData.user = selectedUsers[0]; // Assuming only one user can be selected
      }
      
      this.projectService.postRequest("saveProject", projectData).subscribe(response => {
        console.log('Project saved:', projectData, response);
      });
    } else {
      // Handle form validation errors
    }
    this.router.navigate(['/create-project']);
  } 
  
  getReasonObject(reasonId: number): ProjectReason | null {
    return this.reasonList.find(reason => reason.reason_id == reasonId) || null;
  }
  
  getTypeObject(typeId: number): ProjectType | null {
    return this.typesList.find(type => type.type_id == typeId) || null;
  }
  
  getDivisionObject(divisionId: number): ProjectDivision | null {
    return this.divList.find(division => division.division_id == divisionId) || null;
  }
  
  getCategoryObject(categoryId: number): ProjectCategory | null {
    return this.categoryList.find(category => category.category_id == categoryId) || null;
  }
  
  getPriorityObject(priorityId: number): ProjectPriority | null {
    return this.priorityList.find(priority => priority.priority_id == priorityId) || null;
  }
  
  getDepartmentObject(departmentId: number): ProjectDept | null {
    return this.depList.find(department => department.dept_id == departmentId) || null;
  }
  
  getLocationObject(location_id: number): ProjectLocation | null {
    return this.locationList.find(location => location.location_id == location_id) || null;
  }
  endDateValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const startDate = control.parent?.get('startDate')?.value;
        const endDate = control.value;

        if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
          // Show snackbar with error message
          this.showSnackbar('End date should be greater than start date');
          resolve({ endDateInvalid: true });
        } else {
          resolve(null);
        }
      });
    };
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center', // Position of the snackbar
      verticalPosition: 'top',
      panelClass: ['snackbar-error'], // Custom CSS class for styling
    });
  }
  // public logout(): void {
  //   localStorage.clear();
  //   this.router.navigate(['/']);
  // }
 

}