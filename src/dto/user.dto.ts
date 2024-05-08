export interface UserCreateInput{
    name: string,
    email: string,
    password: { 
        salt?: string,
        hash: string       
    },
    role: string,
}