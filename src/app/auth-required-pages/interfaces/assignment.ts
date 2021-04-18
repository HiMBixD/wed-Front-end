export interface assignmentDetails {
    assignment: assignment
    selectedSub: number
    totalSub: number
}

export interface assignment {
    assignmentId: number,
    assignmentName: string,
    create_by: string,
    deadline: deadline,
    deadlineId: number,
    description: string,
    facultyId: number,
}

export interface deadline {
    deadlineId: number,
    endDate: string,
    startDate: string,
}

export enum assignmentStatus {
    noAction = 0,
    accepted = 1,
    rejected = 2,
    commentNotEval = 3
}