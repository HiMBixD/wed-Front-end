interface roles{
    role_id: number;
    role_name: string;
    description: string;
}

export let mockRoles: roles[] = [
    {
        role_id: 1,
        role_name: 'student',
        description: 'regular good ol student'
    },
    {
        role_id: 2,
        role_name: 'marketing manager',
        description: 'manage all faculty'
    },
    {
        role_id: 3,
        role_name: 'marketing coordinator',
        description: 'manage a faculty'
    },
    {
        role_id: 4,
        role_name: 'guest',
        description: 'view all selected submission'
    },
    {
        role_id: 5,
        role_name: 'admin',
        description: 'manage accounts'
    },
]