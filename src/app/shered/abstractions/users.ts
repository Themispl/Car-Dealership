
export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    //password?: string;
}
export interface Credentials {
    email: string;
    password: string;
}
