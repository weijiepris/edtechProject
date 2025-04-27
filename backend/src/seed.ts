import { User } from './models/User.entity';
import { Student } from './models/Student.entity';
import { Parent } from './models/Parent.entity';
import { Teacher } from './models/Teacher.entity';
import { Class } from './models/Class.entity';
import { Assignment } from './models/Assignment.entity';
import { StudentClass } from './models/StudentClass.entity';
import { Submission } from './models/Submission.entity';
import { AssignmentStatus, UserRoles } from './utils/constants';
import { Chat, ChatMessage } from './models';

import db from './config/db';

const run = async () => {
  db(true)
    .initialize()
    .then(async () => {
      console.info('Database connection initialised');
      await loadSeed();
    })
    .catch(error => {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Unable to initialise database, is your container running?');
      } else {
        console.error('database has error: ', error);
      }
    });
};

run().catch(error => {
  console.error('Failed to load demo data:', error);
  process.exit(1);
});

const loadSeed = async (): Promise<void> => {
  const createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    role: UserRoles
  ) => {
    const user = User.create({
      firstName,
      lastName,
      age: 30,
      email,
      password: '$2b$10$SFtoOzAnFNNzohZUMDwGRuYnndzxC3sieNkBHJJ58MzMePMiHj.36',
      role
    });
    await user.save();
    return user;
  };

  const teacherUser = await createUser('Dan', 'Neil', 'teacher@example.com', UserRoles.TEACHER);
  const parentAUser = await createUser('Louie', 'Smith', 'parentA@example.com', UserRoles.PARENT);
  const parentBUser = await createUser('John', 'Cheng', 'parentB@example.com', UserRoles.PARENT);

  const studentAUser = await createUser('Student', 'A', 'studentA@example.com', UserRoles.STUDENT);
  const studentBUser = await createUser('Jane', 'Smith', 'studentB@example.com', UserRoles.STUDENT);
  const studentCUser = await createUser(
    'Javio',
    'Cheng',
    'studentC@example.com',
    UserRoles.STUDENT
  );

  const parentA = Parent.create({ user: parentAUser });
  const parentB = Parent.create({ user: parentBUser });
  await parentA.save();
  await parentB.save();

  const createStudent = async (user: User, parent: Parent) => {
    const student = Student.create({
      user,
      grade: '12',
      school: 'Demo High',
      parent,
      isActive: true,
      friends: []
    });
    await student.save();
    return student;
  };

  const studentA = await createStudent(studentAUser, parentA);
  const studentB = await createStudent(studentBUser, parentA);
  const studentC = await createStudent(studentCUser, parentB);

  const teacher = Teacher.create({ user: teacherUser });
  await teacher.save();

  const mathClass = Class.create({
    name: 'Mathematics',
    courseCode: 'MATH101',
    courseType: 'Math',
    term: 'Spring 2025',
    teacher: teacherUser.uuid
  });
  await mathClass.save();

  const englishClass = Class.create({
    name: 'English Literature',
    courseCode: 'ENG202',
    courseType: 'English',
    term: 'Spring 2025',
    teacher: teacherUser.uuid
  });
  await englishClass.save();

  const mathAssignmentsData = [
    {
      title: 'Addition Basics',
      description:
        'Practice solving linear equations with one variable and simplify algebraic expressions using addition rules.',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      class: mathClass
    },
    {
      title: 'Subtraction Essentials',
      description:
        'Solve problems involving angles in triangles and apply basic geometric theorems to subtract and find unknown values.',
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      class: mathClass
    },
    {
      title: 'Multiplication Practice',
      description:
        'Use trigonometric ratios (sine, cosine, tangent) to calculate missing side lengths and angles in right triangles.',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      class: mathClass
    },
    {
      title: 'Division & Probability',
      description:
        'Analyze data sets to calculate mean, median, and mode. Solve introductory probability problems using division and ratios.',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      class: mathClass
    }
  ];

  const englishAssignmentsData = [
    {
      title: 'Phonics',
      description:
        'Practice phonetic decoding by identifying vowel and consonant sounds in a provided word list. Submit with phonetic symbols.',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      class: englishClass
    },
    {
      title: 'Nouns',
      description:
        'Complete the worksheet identifying proper, common, abstract, and collective nouns in context. Provide your own examples as well.',
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      class: englishClass
    },
    {
      title: 'Vocabulary',
      description:
        'Demonstrate mastery of 10 new vocabulary words by using them in original, context-rich sentences. Include definitions.',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      class: englishClass
    },
    {
      title: 'Final Test 1',
      description:
        'Write a literary essay analyzing character growth and moral dilemmas in "To Kill a Mockingbird". Cite specific passages.',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      class: englishClass
    },
    {
      title: 'Final Test 2',
      description:
        'Compose a short mystery story (500–700 words) that builds suspense and includes an unexpected plot twist.',
      dueDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
      class: englishClass
    }
  ];

  const enroll = async (student: Student, classEntity: Class) => {
    const sc = StudentClass.create({ student, class: classEntity, status: 'active' });
    await sc.save();
  };

  await Promise.all([
    enroll(studentA, mathClass),
    enroll(studentA, englishClass),
    enroll(studentB, mathClass),
    enroll(studentB, englishClass),
    enroll(studentC, mathClass),
    enroll(studentC, englishClass)
  ]);

  const mathAssignments = [];
  for (const data of mathAssignmentsData) {
    const assignment = Assignment.create({ ...data, class: mathClass });
    await assignment.save();
    mathAssignments.push(assignment);
  }

  const englishAssignments = [];
  for (const data of englishAssignmentsData) {
    const assignment = Assignment.create({ ...data, class: englishClass });
    await assignment.save();
    englishAssignments.push(assignment);
  }

  const createSubmission = async (
    students: { [key: string]: Student },
    mathAssignments: Assignment[],
    englishAssignments: Assignment[]
  ): Promise<void> => {
    const submissionRecord = {
      studentA: {
        math: [
          {
            assignment: mathAssignments[0],
            content: '1+1=1',
            status: AssignmentStatus.SUBMITTED,
            submittedAt: new Date(),
            grade: '10/10'
          },
          {
            assignment: mathAssignments[1],
            content: '',
            status: AssignmentStatus.ACTIVE,
            grade: '-'
          },
          {
            assignment: mathAssignments[2],
            content: '',
            status: AssignmentStatus.ACTIVE,
            grade: '-'
          },
          {
            assignment: mathAssignments[3],
            content: '',
            status: AssignmentStatus.ACTIVE,
            grade: '-'
          }
        ],
        english: [
          {
            assignment: englishAssignments[0],
            content: 'Clear water.',
            status: AssignmentStatus.SUBMITTED,
            submittedAt: new Date(),
            grade: '10/10'
          },
          {
            assignment: englishAssignments[1],
            content: '',
            status: AssignmentStatus.ACTIVE,
            grade: '-'
          },
          {
            assignment: englishAssignments[2],
            content: '',
            status: AssignmentStatus.ACTIVE,
            grade: '-'
          },
          {
            assignment: englishAssignments[3],
            content: '',
            status: AssignmentStatus.ACTIVE,
            grade: '-'
          },
          {
            assignment: englishAssignments[4],
            content: '',
            status: AssignmentStatus.ACTIVE,
            grade: '-'
          }
        ]
      },
      studentB: {
        math: [
          {
            assignment: mathAssignments[0],
            content: '2+2=4',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED_LATE,
            grade: '10/10'
          },
          {
            assignment: mathAssignments[1],
            content: '5-3=2',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '9/10'
          },
          {
            assignment: mathAssignments[2],
            content: '3x3=9',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '8/10'
          },
          {
            assignment: mathAssignments[3],
            content: '8/2=4',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '7/10'
          }
        ],
        english: [
          {
            assignment: englishAssignments[0],
            content: 'Clean water.',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '9/10'
          },
          {
            assignment: englishAssignments[1],
            content: 'Cats meow.',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '10/10'
          },
          {
            assignment: englishAssignments[2],
            content: 'Strong wind.',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '8/10'
          },
          {
            assignment: englishAssignments[3],
            content: 'Justice wins.',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '-'
          },
          {
            assignment: englishAssignments[4],
            content: '',
            status: AssignmentStatus.ACTIVE,
            grade: '-'
          }
        ]
      },
      studentC: {
        math: [
          {
            assignment: mathAssignments[0],
            content: '6+1=7',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '9/10'
          },
          {
            assignment: mathAssignments[1],
            content: '10-3=7',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '8/10'
          },
          {
            assignment: mathAssignments[2],
            content: '4x2=8',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '7/10'
          },
          {
            assignment: mathAssignments[3],
            content: '9/3=3',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '-'
          }
        ],
        english: [
          {
            assignment: englishAssignments[0],
            content: 'Air clean.',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '10/10'
          },
          {
            assignment: englishAssignments[1],
            content: 'Lions roar.',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '9/10'
          },
          {
            assignment: englishAssignments[2],
            content: 'Magic spell.',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '8/10'
          },
          {
            assignment: englishAssignments[3],
            content: 'Truth hurts.',
            submittedAt: new Date(),
            status: AssignmentStatus.SUBMITTED,
            grade: '-'
          },
          {
            assignment: englishAssignments[4],
            content: '',
            status: AssignmentStatus.ACTIVE,
            grade: '-'
          }
        ]
      }
    };
    for (const [key, studentData] of Object.entries(submissionRecord)) {
      const student = students[key];
      if (!student) continue;

      const allSubmissions = [...studentData.math, ...studentData.english];
      for (const entry of allSubmissions) {
        const submission = Submission.create({
          student,
          assignment: entry.assignment,
          content: entry.content,
          submittedAt: entry.submittedAt,
          status: entry.status,
          grade: entry.grade
        });
        await submission.save();
      }
    }
  };
  await createSubmission(
    {
      studentA: studentA,
      studentB: studentB,
      studentC: studentC
    },
    mathAssignments,
    englishAssignments
  );

  const conversationSamples: Record<string, [string, string]> = {
    'studentA-studentB': [
      'Hey, did you finish the Math homework?',
      'Almost done! Need help with question 3?'
    ],
    'studentA-studentC': [
      'Are you joining the English group project?',
      'Yes! Let’s meet after school.'
    ],
    'studentB-studentC': [
      'Which topic did you pick for the final essay?',
      'I chose Environmental Issues. You?'
    ],
    'studentA-teacher': [
      'Ms. Smith, I’m confused about today’s lesson.',
      'No worries, I’ll explain it to you tomorrow!'
    ],
    'studentB-teacher': [
      'Can you extend the project deadline?',
      'Submit what you have by Friday and we’ll discuss.'
    ],
    'studentC-teacher': ['How many pages should the report be?', 'Around 3 to 5 pages is good.'],
    'studentB-parentA': [
      'Mom, I need help with my Science homework!',
      'Sure, let’s sit down after dinner and work on it.'
    ],
    'parentA-teacher': [
      'Hi Ms. Smith, how is John doing in Math?',
      'He’s improving steadily, just needs to submit assignments on time!'
    ]
  };

  const userIds: Record<string, User> = {
    studentA: studentAUser,
    studentB: studentBUser,
    studentC: studentCUser,
    teacher: teacherUser,
    parentA: parentAUser
  };

  const chatPairs = [
    ['studentA', 'studentB'],
    ['studentA', 'studentC'],
    ['studentB', 'studentC'],
    ['studentA', 'teacher'],
    ['studentB', 'teacher'],
    ['studentC', 'teacher'],
    ['studentB', 'parentA'],
    ['parentA', 'teacher']
  ];

  for (const [userAKey, userBKey] of chatPairs) {
    const userA = userIds[userAKey];
    const userB = userIds[userBKey];

    const chat = Chat.create({ userA, userB });
    await chat.save();

    const convoKey = `${userAKey}-${userBKey}`;
    const reverseConvoKey = `${userBKey}-${userAKey}`;
    const convo = conversationSamples[convoKey] ||
      conversationSamples[reverseConvoKey] || ['Hello!', 'Hi!'];

    const msg1 = ChatMessage.create({
      chat,
      content: convo[0],
      sender: userA,
      receiverId: userB.uuid
    });
    await msg1.save();

    const msg2 = ChatMessage.create({
      chat,
      content: convo[1],
      sender: userB,
      receiverId: userA.uuid
    });
    await msg2.save();

    chat.lastMessage = msg2;
    await chat.save();
  }
};
