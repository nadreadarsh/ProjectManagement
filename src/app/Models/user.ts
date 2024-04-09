export class User {
    userId:number;
    username: string;
    contact: string;
    email: string;
    password: string;
    address: string;
id: any;

    constructor(userId: number,username: string, contact: string, email: string, password: string, address: string) {
        this.userId = userId;
        this.username = username;
        this.contact = contact;
        this.email = email;
        this.password = password;
        this.address = address;
    }
}
