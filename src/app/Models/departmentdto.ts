export class Departmentdto {
    dept_id:number;
    dept_name:String;
    totalProjects: number;
    departmentSuccessData:Departmentdto;
    closedProjects:number;
    successRate:number;
    constructor(successRate:number,closedProjects:number,dept_id:number,dept_name:string,totalProjects:number,departmentSuccessData:Departmentdto){
        this.dept_id=dept_id;
        this.dept_name=dept_name;
        this.totalProjects=totalProjects;
        this.departmentSuccessData=departmentSuccessData;
        this.closedProjects=closedProjects;
        this.successRate=successRate;
    }
}
