export interface userInterface {
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role_id: number;
    faculty_id: number;
}
export let mockUser: userInterface[] = [
    {
        username: "acc1",
        firstName: "guy",
        lastName: "nguyen",
        phone: "0009988",
        email: "this@that.com",
        role_id: 1,
        faculty_id: 2
    },
    {
        username: "acc2",
        firstName: "dude",
        lastName: "le",
        phone: "0009938",
        email: "this@there.com",
        role_id: 1,
        faculty_id: 2
    },
    {
        username: "acc3",
        firstName: "bro",
        lastName: "do",
        phone: "0009938",
        email: "that@there.com",
        role_id: 1,
        faculty_id: 2
    },
    {
        username: "acc4",
        firstName: "sis",
        lastName: "tran",
        phone: "00654658",
        email: "those@there.com",
        role_id: 1,
        faculty_id: 3
    },
    {
        username: "acc5",
        firstName: "mate",
        lastName: "hoang",
        phone: "006546f58",
        email: "those1@there.com",
        role_id: 2,
        faculty_id: 3
    },
    {
        username: "acc6",
        firstName: "uncle",
        lastName: "luu",
        phone: "006546238",
        email: "those12@there.com",
        role_id: 1,
        faculty_id: 1
    }
];