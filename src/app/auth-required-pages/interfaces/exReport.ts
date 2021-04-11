export interface exReport {
  assignmentName: string;
  create_by: string; // marketing coordinator's username
  username: string; // student username
  submissionDate: any; // original submission date
  daysOverdue: number; // calc the days since 14th day mark
  faculty: string;
  facultyId: number;
}

/**export let mockExReport: exReport[] = [
 {
    assignmentName: 'Tech trends',
    faculty: 'Computer Science',
    create_by: 'coordinator01',
    username: 'mai123',
    submissionDate: '22/2/2020',
    daysOverdue: '30',
  },
 {
    assignmentName: 'Tech trends',
    faculty: 'Computer Science',
    create_by: 'coordinator01',
    username: 'mai123',
    submissionDate: '22/2/2020',
    daysOverdue: '30',
  },
 {
    assignmentName: 'Tech trends',
    faculty: 'Computer Science',
    create_by: 'coordinator01',
    username: 'mai123',
    submissionDate: '22/2/2020',
    daysOverdue: '30',
  },

 ];
 */
export let mockNoCommentYet: exReport[] =
  [
    {
      assignmentName: 'Tech trends',
      faculty: 'Computer Science',
      create_by: 'coordinator01',
      username: 'mai123',
      submissionDate: '22/2/2020',
      daysOverdue: 30,
      facultyId: 0
    },
    {
      assignmentName: 'Tech trends',
      faculty: 'Computer Science',
      create_by: 'coordinator01',
      username: 'mai123',
      submissionDate: '22/2/2020',
      daysOverdue: 30,
      facultyId: 0

    },
    {
      assignmentName: 'Tech trends',
      faculty: 'Computer Science',
      create_by: 'coordinator01',
      username: 'mai123',
      submissionDate: '22/2/2020',
      daysOverdue: 30,
      facultyId: 0

    },
    {
      assignmentName: 'Tech trends',
      faculty: 'Computer Science',
      create_by: 'coordinator01',
      username: 'mai123',
      submissionDate: '22/2/2020',
      daysOverdue: 30,
      facultyId: 0

    },

  ];

