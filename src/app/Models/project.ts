import { ProjectCategory } from "./project-category";
import { ProjectDept } from "./project-dept";
import { ProjectDivision } from "./project-division";
import { ProjectLocation } from "./project-location";
import { ProjectPriority } from "./project-priority";
import { ProjectReason } from "./project-reason";
import { ProjectStatus } from "./project-status";
import { ProjectType } from "./project-type";
import { User } from "./user";

export class Project {
    project_id: number;
    project_name:string;
    category_id:number;
    category_name:string;
    dept_id:number;
    dept_name:string;
    type_id:number;
    type_name:string;
    division_id:number;
    division_name:string;
    location_id:number;
    location_name:string;
    priority_id:number;
    priority_name:string;
    reason_id:number;
    reason_name:string;
    status_id:number;
    status_name:string;
    endDate:Date;
    startDate:Date
  // static project_name: any;
  // ProjectType: any;
  // projectReason: any;
  // projectDivision: any;
  // ProjectCategory: any;
  // priority: any;
  // department: any;
  // location: any;
  // status: any;
  id?: number;
  projectName?: string;
  reason?: ProjectReason;
  type?: ProjectType;
  division?: ProjectDivision;
  category?: ProjectCategory;
  priority?: ProjectPriority;
  department?: ProjectDept;
  startdate?: Date;
  enddate?: Date;
  location?: ProjectLocation;
  status?: ProjectStatus;
  user?: User;


  [key: string]: number | string | Date | any[] | ProjectReason | ProjectType | ProjectDivision | ProjectCategory | ProjectPriority
  | ProjectDept | ProjectLocation | ProjectStatus | User | undefined;

    constructor(project_id:number,project_name:string,category_id:number,category_name:string,dept_id:number, dept_name:string,division_id:number,division_name:string,location_id:number,location_name:string,priority_id:number,
      priority_name:string, 
      reason_id:number,
      reason_name:string,
        type_id:number,type_name:string,
        status_id:number,
        status_name:string,
        endDate:Date,
        startDate:Date){
            this.dept_id=dept_id;
            this.dept_name=dept_name;
            this.category_id=category_id;
            this.category_name=category_name;
            this.division_id=division_id;
            this.division_name=division_name;
            this.endDate=endDate;
            this.location_id=location_id;
            this.location_name=location_name;
            this.priority_id=priority_id;
            this.priority_name=priority_name;
            this.project_id=project_id;
            this.project_name=project_name;
            this.reason_id=reason_id;
            this.reason_name=reason_name;
            this.startDate=startDate;
            this.status_id=status_id;
            this.status_name=status_name;
            this.type_id=type_id;
            this.type_name=type_name
            
        }

}
