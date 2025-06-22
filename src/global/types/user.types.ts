export enum UserRole {
    SuperAdmin = "SUPERADMIN",
    Admin = "ADMIN",
    User = "USER"

}

export interface generate_token_interface{
    id:number,
    role:string
}