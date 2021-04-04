export interface userInterface {
    userName: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    role: {
        description: string,
        roleName: string,
    },
    facultyId?: number,
}

export interface facultyInterface {
    facultyId: number,
    facultyName: string
}

export interface roleInterface {
    roleId: number,
    roleName: string,
}