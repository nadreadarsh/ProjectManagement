import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NO_ERRORS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreateProjectComponent } from "../create-project/create-project.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiService } from '../api.service';
import { SignupServiceService } from '../signup-service.service';
import { Observable } from 'rxjs';
import { ProjectDept } from '../Models/project-dept';
import { Departmentdto } from '../Models/departmentdto';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    providers: [ApiService,SignupServiceService], 
  schemas: [NO_ERRORS_SCHEMA],  
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CreateProjectComponent,NgxChartsModule]
})
export class DashboardComponent  {
    loggedInUser!: string;
  totalProjects: number = 0;
  closedProjectsCount: number = 0;
  cancelledProjectsCount: number = 0;
  runningProjectsCount: number = 0; 
  closureDelayProjectsCount: number = 0;
  departmentSuccessData: Departmentdto[]=[];
  userData!: Observable<any>; 
  
 
 
  sampleData!: any[];
  xAxis!: any;
  seriesGroups!: any[];

  constructor(private apiService: ApiService,private sessionService: SignupServiceService,private router: Router) {}

  ngOnInit(): void {
    
    // this.getSession()
    this.fetchDepartmentSuccessData();
    this.fetchTotalProjectsCount();
    this.fetchClosedProjectsCount();
    this.fetchCancelledProjectsCount();
    this.fetchRunningProjectsCount();
    this.fetchClosureDelayProjectsCount();
   
  }
  

  fetchTotalProjectsCount(): void {
    this.apiService.getRequest('project/getTotalProjectCount').subscribe(
      (count: number) => {
        this.totalProjects = count;
      },
      (error: any) => {
        console.log('Error fetching total projects count:', error);
      }
    );
  }

  fetchClosedProjectsCount(): void {
    this.apiService.getRequest('project/closedProjectsCount').subscribe(
      (data: number) => {
        this.closedProjectsCount = data;
      }, 
      (error: any) => {
        console.error('Error fetching closed projects count:', error);
      }
    );
  }

  fetchCancelledProjectsCount(): void {
    this.apiService.getRequest('project/cancelledProjectsCount').subscribe(
      (data: number) => {
        this.cancelledProjectsCount = data;
      },
      (error: any) => {
        console.error('Error fetching cancelled projects count:', error);
      }
    );
  }

  fetchRunningProjectsCount(): void {
    this.apiService.getRequest('project/runningProjectsCount').subscribe(
      (data: number) => {
        this.runningProjectsCount = data;
      },
      (error: any) => {
        console.error('Error fetching running projects count:', error);     
      }
    ); 
  }
  fetchClosureDelayProjectsCount(): void {
    this.apiService
      .getRequest('project/getClosureDelayProjectsCount')
      .subscribe(
        (data: number) => {
          this.closureDelayProjectsCount = data;
        },
        (error: any) => {
          console.error('Error fetching running projects count:', error);
        }
      );
  }
  fetchDepartmentSuccessData(): void {
    this.apiService.getRequest('project/getDepartmentSuccessData').subscribe(
      (data: Departmentdto[]) => {
        this.departmentSuccessData = data;
  
        // Populate sampleData array
        this.sampleData = data.map(item => ({
          department: item.dept_name,
          totalProjects: item.totalProjects, 
          totalProjectsclosed: item.closedProjects, 
          successPercentage: item.successRate 
        }));
  
        console.log('sampledata 11',this.sampleData)
        // Configure xAxis
        this.xAxis = { 
          dataField: 'department', 
          showGridLines: true,  
          labels: {
            formatFunction: (value: string): string => {
                // const abbreviatedValue = value.substring(0, 5);
                const item = this.sampleData.find((item) => item.department == value);
                if (item) {
                  return `${item.successPercentage}% <br> ${value}`; // Corrected interpolation
                } else {
                  return value; // Return the original value if item is not found
                }
              }
              
          },
        };
  
  
        // Configure seriesGroups
        this.seriesGroups = [
          {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 0,
            valueAxis: {
              unitInterval: 2,
              minValue: 0,
              maxValue: 16,
              displayValueAxis: true,
              description: '',
              axisSize: 'auto',
              tickMarksColor: '#888888'
            },
            series: [
              { dataField: 'totalProjects', displayText: 'Total Projects' },
              { dataField: 'totalProjectsclosed', displayText: 'Closed Projects' },
             
            ]
          }
        ];
      
        console.log('Department success data:', data);
      },
      (error: any) => {
        console.error('Error fetching department success data:', error);
      }
    );
  }
  
  logout() {
  //  this.sessionService.setLoggedIn(false);
    this.router.navigate(['/login']);
  }


  padding: any = { left: 15, top: 15, right: 15, bottom: 15 };
  titlePadding: any = { left: 10, top: 10, right: 0, bottom: 10 }; 

//   getSession(){
//     this.sessionService.getSession().subscribe(
//       (response: string) => {
//         this.loggedInUser = response;
//         console.warn("Inside dashboard getSession : ",this.loggedInUser)
//       },
//       (error) => {
//         console.log("Error getting session:", error);
//       }
//     );
    
//   }
  
  

isManager():any {
  
}


  }
  
