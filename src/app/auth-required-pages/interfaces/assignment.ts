interface assignmentDetails {
    assignment: assignment
    selectedSub: number
    totalSub: number
}

interface assignment {
    assignmentId: number,
    assignmentName: string,
    create_by: string,
    deadline: deadline,
    deadlineId: number,
    description: string,
    facultyId: number,
}

interface deadline {
    deadlineId: number,
    endDate: string,
    startDate: string,
}
export enum assignmentStatus {
    noAction = 0,
    selected = 1,
    denied = 2,
    commentNotEval = 3
}