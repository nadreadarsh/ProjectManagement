import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './Models/user';


@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {
  getAllCategory() {
    throw new Error('Method not implemented.');
  }
  saveProject(request: { projectName: any; reasonId: any; typeId: any; categoryId: any; priorityId: any; deptId: any; locationId: any; statusId: any; startDate: any; endDate: any; userId: any; }) {
    throw new Error('Method not implemented.');
  }
  

  url="http://localhost:8080/userinfo/"
  constructor(private http:HttpClient) { }

  getUser():Observable<any>{
    return this.http.get<any>(this.url+"getUser")
  }

  saveUser(project:User):Observable<any>{
    return this.http.post<any>(this.url+"saveUser",project).pipe(
      catchError(this.errorHandler)
    );
  }


  public updateUser(user:any):Observable<any>{
   return this.http.put<any>(this.url+"updateUser",user).pipe(
    catchError(this.errorHandler)
   );
 }
 public deleteUser(id:number):Observable<any>{
   return this.http.delete<any>(this.url+"deleteUser/"+id).pipe(
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
   login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}login`, { email, password });
  }
}
