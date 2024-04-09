import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ProjectStatus } from './Models/project-status';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  putRequest(arg0: number, arg1: any, arg2: { statusId: number; }, arg3: {}) {
    throw new Error('Method not implemented.');
  }
  getRequest(arg0: string) {
    throw new Error('Method not implemented.');
  }
  url:string="http://localhost:8080/project/"

 private ProjectList: any[] =[];
  constructor(private http: HttpClient) { }


  getAllProject():Observable<any>{
    return this.http.get<any>(this.url+"getAllProjects");
  }

  getAllReasons():Observable<any>{
    return this.http.get<any>(this.url+"allreason");
  }

  getAllType():Observable<any>{
    return this.http.get<any>(this.url+"types");
  }

  getAllPriority():Observable<any>{
    return this.http.get<any>(this.url+"priority")
  }

  getAllLocation():Observable<any>{
    return this.http.get<any>(this.url+"location")
  }

  getAllDivisions():Observable<any>{
    return this.http.get<any>(this.url+"division")
  }

  getAllDepartment():Observable<any>{
    return this.http.get<any>(this.url+"department")
  }

  getAllCategory():Observable<any>{
    return this.http.get<any>(this.url+"allcategory")
  }
  cancelledProjectsCount():Observable<any>{
    return this.http.get<any>(this.url+"cancelledProjectsCount")
  }
  runningProjectsCount():Observable<any>{
    return this.http.get<any>(this.url+"runningProjectsCount")
  }
  getClosureDelayProjectsCount():Observable<any>{
    return this.http.get<any>(this.url+"getClosureDelayProjectsCount")
  }
  

  getUser():Observable<any>{
    return this.http.get<any>(this.url+"getUser")
  }
  
  public updatestatus(user:any):Observable<any>{
    return this.http.put<any>(this.url+"updatestatus",ProjectStatus).pipe(
     catchError(this.errorHandler)
    );
  }
  public postRequest(url: string, param: {}) {
    return this.http.post(this.url + url, param)
      .pipe(
        catchError(this.errorHandler.bind(this)) // then handle the error
      );
  }

 
  public getProjectList():Observable<any[]>{
    return this.http.get<any[]>(this.url).pipe(
      tap(projects =>{
        this.ProjectList=projects;
        
      }),
      catchError(this.errorHandler)
    )
   }
  // searchProjectById(id:number):Observable<any>{
  //   return this.http.searchProjectById<any>(this.url+"searchProjectById/"+id).pipe(catchError(this.errorHandler))
  // }


  saveProject(project: Object): Observable<any> {
    console.log("Inside Service")
    return this.http.post<any>(this.url + "saveProject", project).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error:any){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      errorMessage=error.error.message;
    }
    else{
      errorMessage='error code :$(error.status)\nMessage:${error.message}'
    }
    console.log(errorMessage);
    return throwError(()=>new Error(errorMessage));
   }
}
