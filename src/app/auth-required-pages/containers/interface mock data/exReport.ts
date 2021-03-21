export interface exReport {
    assignment: string,
    issues: string,
    creator: string, //marketing coordinator's username
    studentUsername: string, //student username
    submissionDate: string, //original submission date
    daysOverdue: string, //calc the days since 14th day mark
    faculty: string,
}

export let mockExReport: exReport[] = [
    {
        assignment: 'Tech trends',
        faculty: 'Computer Science',
        issues: '17',
        creator: 'coordinator01',
        studentUsername: 'mai123',
        submissionDate: '22/2/2020',
        daysOverdue: '30',
    },
    {
        assignment: 'Tech trends',
        faculty: 'Computer Science',
        issues: '17',
        creator: 'coordinator01',
        studentUsername: 'hahahoho',
        submissionDate: '22/2/2020',
        daysOverdue: '30',
    },
    {
        assignment: 'Should you get into stocks',
        faculty: 'Finance',
        issues: '17',
        creator: 'coordinator02',
        studentUsername: 'ime200',
        submissionDate: '26/2/2020',
        daysOverdue: '26',
    },

]

export let mockNoCommentYet: exReport[] =
    [
        {
            assignment: 'Tech trends',
            faculty: 'Computer Science',
            issues: '17',
            creator: 'coordinator01',
            studentUsername: 'mai123',
            submissionDate: '15/3/2020',
            daysOverdue: '15',
        },
        {
            assignment: 'Tech trends',
            faculty: 'Computer Science',
            issues: '17',
            creator: 'coordinator01',
            studentUsername: 'hahahoho',
            submissionDate: '16/3/2020',
            daysOverdue: '8',
        },
        {
            assignment: 'Should you get into stocks',
            faculty: 'Finance',
            issues: '17',
            creator: 'coordinator02',
            studentUsername: 'ime200',
            submissionDate: '17/3/2020',
            daysOverdue: '7',
        },
        {
            assignment: 'Should you get into stocks',
            faculty: 'Finance',
            issues: '17',
            creator: 'coordinator02',
            studentUsername: 'acc7',
            submissionDate: '17/3/2020',
            daysOverdue: '7',
        },

]