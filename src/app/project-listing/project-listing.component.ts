import { Component, OnInit } from '@angular/core';
import { Project } from '../Models/project';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-listing',
  standalone: true,
  imports: [CommonModule],
  providers: [ ApiService],
  templateUrl: './project-listing.component.html',
  styleUrl: './project-listing.component.css'
})
export class ProjectListingComponent  implements OnInit  {
  projects:Project[]=[];
  searchText: string = '';
  filteredProjects : Project[]=[];
   selectedColumn: string = 'project_name';
   currentPage: number = 1;
   itemsPerPage: number = 10;
   totalItems: number = 0;
   totalPages: number = 0;
 
  
   constructor (public  myservice :ApiService, public router:Router){
 
     }
  
     ngOnInit(): void {
     this.featchProjects();
    //  this.filterProjects();
    
   }

  //  featchProjects(): void {
  //   this.myservice.getAllProject().subscribe(projects =>{
  //     this.projects = projects
  //     this.filteredProjects = [...this.projects];     
  //   });
  //   }

    featchProjects(): void {
     this.myservice.getAllProject().subscribe(projects =>{
       this.totalItems = projects.length;
       this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
 
         if (this.currentPage > this.totalPages) {
         this.currentPage = this.totalPages;
         
       }
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
       const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.totalItems - 1);
        this.projects = projects.slice(startIndex, endIndex + 1);
     },(error: any) => {
      console.error('Error fetching projects:', error);
    });
     
    }

    filterProjects() {
      if (!this.searchText.trim()) {
        // If search term is empty, display all projects
        this.filteredProjects = [...this.projects];
      } else {
        // Filter projects based on project name containing the search term (case-insensitive)
        this.filteredProjects = this.projects.filter(project =>
          this.isProjectMatchingSearchTerm(project, this.searchText.toLowerCase())
        );
      }
    }
    // Check if the project matches the search term in any column
    isProjectMatchingSearchTerm(project: Project, searchTerm: string): boolean {
      // Check if any column contains the search term
      return Object.values(project).some(value =>
        (typeof value === 'string' || typeof value === 'number') && value.toString().toLowerCase().includes(searchTerm)
      );
    }
    
   onPageChange(page: number): void {
     this.currentPage = page;
     this.featchProjects();
   }
 
    startProject(project:Project){
  console.log("in startProject")
    this.updateProjectStatus(project.project_id, 1)
    }
 
    closeProject(project:Project){
     console.log("Close button clicked for project:", project);
      this.updateProjectStatus(project.project_id, 2);
    }
     
   cancelProject(project: Project): void {
     console.log("in cancelProject")
    this.updateProjectStatus(project.project_id, 3);
 }
 
    updateProjectStatus(project_id: number, status_id: number): void {
     this.myservice.updatestatus(status_id)
       .subscribe( 
         response => {
           console.log('Project status updated:', response);
           this.featchProjects();
         },
         error => {
           console.error('Error updating project status:', error);
         }
      );
   }

   
    // Sorting
//   applySort(){
//     this.sortFilteredProjects();
//     console.log("in sort")
// }
// sortFilteredProjects(): void {
//   if (!this.selectedColumn) return; // No column selected for sorting
// console.log("sorted...")
// console.log(this.selectedColumn)
//   // Sort the filtered projects based on the selected column
//   this.filteredProjects.sort((a, b) => {
//     const valA = this.getValueForSorting(a, this.selectedColumn);
//     const valB = this.getValueForSorting(b, this.selectedColumn);

//     if (valA < valB) return this.isSortAscending ? -1 : 1;
//     if (valA > valB) return this.isSortAscending ? 1 : -1;
//     return 0;
//   });
// }
// // Get value for sorting based on column
// getValueForSorting(project: Project, column: string): any {
//   switch (column) {
//     case 'project_name':
//       return project.project_name;
//     case 'reason':
//       return project.reason_id?.reason_name;
//     case 'type':
//       return project.type_id?.type_name;
//     case 'division':
//       return project.division_id?.division_name;
//     case 'category':
//       return project.category_id?.category_name;
//     case 'priority':
//       return project.priority_id?.priority_name;
//     case 'department':
//       return project.dept_id?.dept_name;
//     case 'location':
//       return project.location_id?.location_name;
//     case 'status':
//       return project.status_id?.status_name;
//     case 'startDate':
//       return project.startDate ? new Date(project.startDate) : null;
//     case 'endDate':
//       return project.endDate ? new Date(project.endDate) : null;
//     default:
//       return project;
//   }
// }

   
 
}