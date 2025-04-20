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
  const user = User.create({
    firstName: 'test',
    lastName: 'here',
    age: 40,
    email: 'test@here.com',
    password: '$2b$10$SFtoOzAnFNNzohZUMDwGRuYnndzxC3sieNkBHJJ58MzMePMiHj.36',
    role: UserRoles.PARENT
  });

  await user.save();

  const parentUser = User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    age: 40,
    email: 'jane.derp@example.com',
    password: '$2b$10$SFtoOzAnFNNzohZUMDwGRuYnndzxC3sieNkBHJJ58MzMePMiHj.36',
    role: UserRoles.PARENT
  });
  await parentUser.save();

  const parent = Parent.create({ user: parentUser });
  await parent.save();

  const studentUser = User.create({
    firstName: 'John',
    lastName: 'Doe',
    age: 18,
    email: 'john.doe@example.com',
    password: '$2b$10$SFtoOzAnFNNzohZUMDwGRuYnndzxC3sieNkBHJJ58MzMePMiHj.36',
    role: UserRoles.STUDENT
  });
  await studentUser.save();
  const studentUser2 = User.create({
    firstName: 'John',
    lastName: 'Dumma',
    age: 18,
    email: 'john.dumma@example.com',
    password: '$2b$10$SFtoOzAnFNNzohZUMDwGRuYnndzxC3sieNkBHJJ58MzMePMiHj.36',
    role: UserRoles.STUDENT
  });
  await studentUser2.save();

  const student = Student.create({
    user: studentUser,
    grade: '12',
    school: 'Demo High School',
    parent: parent,
    isActive: true,
    friends: []
  });
  await student.save();
  const student2 = Student.create({
    user: studentUser2,
    grade: '12',
    school: 'Demo High School',
    parent: parent,
    isActive: true,
    friends: []
  });
  await student2.save();

  const teacherUser = User.create({
    firstName: 'Emily',
    lastName: 'Smith',
    age: 35,
    email: 'emily.smith@example.com',
    password: '$2b$10$SFtoOzAnFNNzohZUMDwGRuYnndzxC3sieNkBHJJ58MzMePMiHj.36',
    role: UserRoles.PARENT
  });
  await teacherUser.save();

  const teacher = Teacher.create({ user: teacherUser });
  await teacher.save();

  const classEntity = Class.create({
    name: 'Educational Technology',
    teacher: teacherUser.uuid,
    courseType: 'CS',
    courseCode: '5450',
    term: 'spring 2025'
  });
  await classEntity.save();

  const classEntity2 = Class.create({
    name: 'Human Computer Interaction',
    teacher: teacherUser.uuid,
    courseType: 'CS',
    courseCode: '6660',
    term: 'spring 2025'
  });
  await classEntity2.save();

  const studentClass = StudentClass.create({
    student: student,
    class: classEntity,
    status: 'active'
  });
  await studentClass.save();

  const studentClass2 = StudentClass.create({
    student: student,
    class: classEntity2,
    status: 'active'
  });
  await studentClass2.save();
  const studentClass3 = StudentClass.create({
    student: student2,
    class: classEntity2,
    status: 'active'
  });
  await studentClass3.save();

  const studentClass4 = StudentClass.create({
    student: student2,
    class: classEntity,
    status: 'active'
  });
  await studentClass4.save();

  const chat = Chat.create({
    userA: studentUser,
    userB: studentUser2
  });
  await chat.save();

  const message1 = ChatMessage.create({
    chat: chat,
    content: 'Hey, have you done the Algebra homework?',
    sender: studentUser,
    receiverId: studentUser2.uuid
  });
  await message1.save();

  const message2 = ChatMessage.create({
    chat: chat,
    content: 'Yeah! Finished it last night, it was tough!',
    sender: studentUser2,
    receiverId: studentUser.uuid
  });
  await message2.save();

  const message3 = ChatMessage.create({
    chat: chat,
    content: 'Same here 😵, took me 3 hours!',
    sender: studentUser,
    receiverId: studentUser2.uuid
  });
  await message3.save();

  chat.lastMessage = message3;
  await chat.save();

  const teacherChat = Chat.create({
    userA: studentUser,
    userB: teacherUser
  });
  await teacherChat.save();

  const teacherMessage1 = ChatMessage.create({
    chat: teacherChat,
    content: 'Hi Ms. Smith, I had a question about the assignment.',
    sender: studentUser,
    receiverId: teacherUser.uuid
  });
  await teacherMessage1.save();

  const teacherMessage2 = ChatMessage.create({
    chat: teacherChat,
    content: 'Sure, what do you need help with?',
    sender: teacherUser,
    receiverId: studentUser.uuid
  });
  await teacherMessage2.save();

  const teacherMessage3 = ChatMessage.create({
    chat: teacherChat,
    content: 'I wasn’t sure how to solve question 4.',
    sender: studentUser,
    receiverId: teacherUser.uuid
  });
  await teacherMessage3.save();

  teacherChat.lastMessage = teacherMessage3;
  await teacherChat.save();

  const assignment1 = Assignment.create({
    title: 'Assignment 1 - Algebra Homework',
    description: 'Complete all questions from chapter 5 of Algebra workbook.',
    dueDate: new Date('2025-04-28'),
    class: classEntity
  });
  await assignment1.save();

  const assignment = Assignment.create({
    class: classEntity,
    title: 'Algebra Homework',
    description: 'Complete all questions from chapter 5',
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  });
  await assignment.save();

  const assignment2 = Assignment.create({
    title: 'Assignment 2 - Trigonometry Worksheet',
    description: 'Solve all trigonometry problems in worksheet B.',
    dueDate: new Date('2025-05-15'),
    class: classEntity
  });
  await assignment2.save();

  const assignment3 = Assignment.create({
    title: 'Assignment 3 - Geometry Challenge',
    description: 'Participate in group geometry problem-solving challenge.',
    dueDate: new Date('2025-06-05'),
    class: classEntity
  });
  await assignment3.save();

  const submission = Submission.create({
    student: student,
    assignment: assignment,
    content: 'Answers to the assignment',
    submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    grade: '10/10',
    status: AssignmentStatus.SUBMITTED
  });
  await submission.save();

  const submission1 = Submission.create({
    content: 'Answers to chapter 5. Please see attached file.',
    grade: '9/10',
    assignment: assignment1,
    student: student,
    submittedAt: new Date('2025-04-29'),
    status: AssignmentStatus.SUBMITTED_LATE
  });
  await submission1.save();

  const submission2 = Submission.create({
    content: 'submitted',
    assignment: assignment2,
    student: student,
    submittedAt: new Date('2025-04-29'),
    status: AssignmentStatus.SUBMITTED
  });
  await submission2.save();

  const submission3 = Submission.create({
    content: '',
    assignment: assignment3,
    student: student,
    status: AssignmentStatus.ACTIVE
  });

  await submission3.save();

  const submissionn = Submission.create({
    student: student2,
    assignment: assignment,
    content: 'Answers to the assignment',
    submittedAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    grade: '0/10',
    status: AssignmentStatus.SUBMITTED_LATE
  });
  await submissionn.save();

  const submissionn1 = Submission.create({
    content: 'Answers to chapter 5. Please see attached file.',
    grade: '0/10',
    assignment: assignment1,
    student: student2,
    submittedAt: new Date('2025-04-29'),
    status: AssignmentStatus.SUBMITTED_LATE
  });
  await submissionn1.save();

  const submissionn2 = Submission.create({
    content: 'submitted',
    assignment: assignment2,
    student: student2,
    submittedAt: new Date('2025-04-29'),
    status: AssignmentStatus.SUBMITTED
  });
  await submissionn2.save();

  const submissionn3 = Submission.create({
    content: '',
    assignment: assignment3,
    student: student2,
    status: AssignmentStatus.ACTIVE
  });

  await submissionn3.save();

  console.log('Demo data loaded');
  process.exit(0);
};
