import { Request, Response } from 'express';
import { Class, Parent, Student } from '../../models';

export const getParentChildClasses = async (req: Request, res: Response) => {
  const userId = req.user?.uuid;

  try {
    const parent = await Parent.findOneOrFail({
      where: { user: { uuid: userId } },
      relations: {
        user: true,
        children: {
          user: true,
          studentClasses: {
            class: true
          }
        }
      }
    });

    const classMap = new Map<
      string,
      {
        class: any;
        students: any[];
      }
    >();

    for (const child of parent.children) {
      for (const studentClass of child.studentClasses) {
        const classUuid = studentClass.class.uuid;

        if (!classMap.has(classUuid)) {
          classMap.set(classUuid, {
            class: {
              uuid: studentClass.class.uuid,
              name: studentClass.class.name,
              courseCode: studentClass.class.courseCode,
              courseType: studentClass.class.courseType,
              term: studentClass.class.term,
              teacher: studentClass.class.teacher
            },
            students: []
          });
        }
      }
    }

    const groupedClasses = Array.from(classMap.values());

    res.status(200).json(groupedClasses);
  } catch (err) {
    console.error('Failed to fetch parent-child classes:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getChildrenByClass = async (req: Request, res: Response) => {
  const userId = req.user?.uuid;
  const { classId } = req.params;

  try {
    if (!userId || !classId) {
      console.log('[getChildrenByClass] missing userId or classId');
      res.status(400).json({ message: 'Missing required parameters.' });
      return;
    }

    const parent = await Parent.findOneOrFail({
      where: { user: { uuid: userId } },
      relations: {
        user: true,
        children: {
          user: true,
          studentClasses: {
            class: true
          }
        }
      }
    });

    const enrolledChildren = parent.children.filter(child =>
      child.studentClasses.some(sc => sc.class.uuid === classId)
    );

    const formatted = enrolledChildren.map(child => ({
      uuid: child.user.uuid,
      firstName: child.user.firstName,
      lastName: child.user.lastName,
      email: child.user.email,
      age: child.user.age,
      role: child.user.role
    }));

    res.status(200).json(formatted);
    return;
  } catch (err) {
    console.error('Failed to fetch children by class:', err);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const getChildAssignmentsByClass = async (req: Request, res: Response) => {
  const { classId, childId } = req.params;
  const userId = req.user?.uuid;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: No user found' });
    return;
  }

  try {
    const student = await Student.findOne({
      where: {
        user: {
          uuid: childId
        }
      },
      relations: {
        user: true
      }
    });

    if (!student) {
      console.log('[getChildAssignmentsByClass] Student not found');
      throw new Error('[getChildAssignmentsByClass] Student not found');
    }

    const classEntity = await Class.createQueryBuilder('class')
      .leftJoinAndSelect('class.assignments', 'assignment')
      .leftJoinAndSelect('assignment.submissions', 'submission')
      .leftJoinAndSelect('submission.student', 'student')
      .where('class.uuid = :classId', { classId })
      .andWhere('student.uuid = :studentId', { studentId: student.uuid })
      .getOne();

    if (!classEntity) {
      res.status(200).json(null);
      return;
    }

    res.status(200).json(classEntity);
  } catch (error) {
    console.error('Error fetching assignments for child:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getChildGradesByClass = async (req: Request, res: Response) => {
  const { classId, childId } = req.params;

  try {
    const student = await Student.findOneOrFail({
      where: { user: { uuid: childId } }
    });

    const classWithGrades = await Class.createQueryBuilder('class')
      .leftJoinAndSelect('class.assignments', 'assignment')
      .leftJoinAndSelect('assignment.submissions', 'submission')
      .leftJoinAndSelect('submission.student', 'student')
      .where('class.uuid = :classId', { classId })
      .andWhere('student.uuid = :studentUuid', { studentUuid: student.uuid })
      .getOne();

    if (!classWithGrades) {
      res.status(404).json({ message: 'Class or assignments not found for this student' });
      return;
    }

    res.status(200).json(classWithGrades);
  } catch (error) {
    console.error('Error fetching grades for child:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
