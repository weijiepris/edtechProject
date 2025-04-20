import { Request, Response } from 'express';
import { StudentClass, Assignment, Class } from '../../models';
import { Student } from '../../models/Student.entity';

export const getClasses = async (req: Request, res: Response) => {
  try {
    const accountUuid = req.user?.uuid;

    if (!accountUuid) {
      res.status(400).json({ message: 'Missing account ID' });
      return;
    }

    const student = await Student.findOne({
      where: { user: { uuid: accountUuid } },
      relations: {
        user: true
      }
    });

    if (!student) {
      console.error({ message: 'Student not found' });
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    const classes = await StudentClass.find({
      where: { student: { uuid: student.uuid }, status: 'active' },
      relations: {
        class: true
      }
    });

    res.status(200).json(classes);
    return;
  } catch (err) {
    console.error('Error fetching student classes:', err);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const getAssignmentsByClass = async (req: Request, res: Response) => {
  const { courseUuid } = req.params;
  const { user } = req;

  if (!user) throw new Error('[getAssignmentsByClass] unable to find user');

  try {
    const student = await Student.findOne({
      where: {
        user: {
          uuid: user.uuid
        }
      }
    });
    if (!student) throw new Error('[getAssignmentsByClass] unable to find student');

    const classEntity = await Class.createQueryBuilder('class')
      .leftJoinAndSelect('class.assignments', 'assignment')
      .leftJoinAndSelect('assignment.submissions', 'submission')
      .leftJoinAndSelect('submission.student', 'student')
      .where('class.uuid = :courseUuid', { courseUuid })
      .andWhere('student.uuid = :studentUuid', { studentUuid: student.uuid })
      .getOne();

    res.json(classEntity);
    return;
  } catch (error) {
    console.error('Error fetching assignments by class:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
