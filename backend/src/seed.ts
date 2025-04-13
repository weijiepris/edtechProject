import { User } from './models/User.entity';
import { Student } from './models/Student.entity';
import { Parent } from './models/Parent.entity';
import { Teacher } from './models/Teacher.entity';
import { Class } from './models/Class.entity';
import { Assignment } from './models/Assignment.entity';
import { StudentClass } from './models/StudentClass.entity';
import { Submission } from './models/Submission.entity';
import { UserRoles } from './utils/constants';
import { Feedback } from 'models';
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
  // base user
  const user = User.create({
    firstName: 'test',
    lastName: 'here',
    age: 40,
    email: 'test@here.com',
    password: '$2b$10$SFtoOzAnFNNzohZUMDwGRuYnndzxC3sieNkBHJJ58MzMePMiHj.36',
    role: UserRoles.PARENT
  });

  await user.save();
  // Create a parent user

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

  // Create a student user
  const studentUser = User.create({
    firstName: 'John',
    lastName: 'Doe',
    age: 18,
    email: 'john.doe@example.com',
    password: '$2b$10$SFtoOzAnFNNzohZUMDwGRuYnndzxC3sieNkBHJJ58MzMePMiHj.36',
    role: UserRoles.STUDENT
  });
  await studentUser.save();
  // Create a student user
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

  // Create a teacher user
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

  // Create a class
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

  // Enroll student in class
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

  // Create an assignment
  const assignment = Assignment.create({
    class: classEntity,
    title: 'Algebra Homework',
    description: 'Complete all questions from chapter 5',
    dueDate: new Date()
  });
  await assignment.save();

  // Create a submission
  const submission = Submission.create({
    student: student,
    assignment: assignment,
    content: 'Answers to the assignment'
  });
  await submission.save();

  // // // Create feedback
  // // const feedback = Feedback.create({
  // //   submission: submission,
  // //   teacher: teacher,
  // //   comment: 'Well done!',
  // //   grade: 10
  // // });
  // // await feedback.save();

  const chat = Chat.create({
    userA: studentUser,
    userB: studentUser2
  });
  await chat.save();

  // Create chat messages
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

  console.log('Demo data loaded');
  process.exit(0);
};
