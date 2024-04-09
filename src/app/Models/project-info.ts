export class ProjectInfo {
    proid:number;
    proname:string;
    prostartdate:Date;
    proenddate:Date;
    prid:number;
    ptid:number;
    pdivid:number;
    pcid:number;
    ppid:number;
    pdid:number;
    plid:number;
    psid:number;
    constructor( proid:number,proname:string,prostartdate:Date,proenddate:Date,prid:number,ptid:number,pdivid:number,pcid:number,ppid:number,pdid:number,plid:number,psid:number){
        this.pcid=pcid;
        this.pdid=pdid;
        this.pdivid=pdivid;
        this.plid=plid;
        this.ppid=ppid;
        this.prid=prid;
        this.proid=proid;
        this.proname=proname;
        this.prostartdate=prostartdate;
        this.proenddate=proenddate;
        this.ptid=ptid;
        this.psid=psid;
    }
}
