import { Request, Response } from 'express';
import { Assignment, Class, Student, StudentClass, Submission } from '../../models';
import { AssignmentStatus } from '../../utils/constants';
import { IsNull } from 'typeorm';

export const getAssignmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req;
  if (!user) throw new Error('[getAssignmentById] user not found');

  try {
    const assignment = await Assignment.findOneOrFail({
      where: {
        uuid: id,
        submissions: {
          student: {
            user: {
              uuid: user.uuid
            }
          }
        }
      },
      relations: {
        class: true,
        submissions: true
      }
    });

    res.status(200).json(assignment);
    return;
  } catch (err) {
    res.status(404).json({ message: 'Assignment not found' });
    return;
  }
};

export const submitAssignment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user?.uuid;

  if (!userId) throw new Error('[submitAssignment] unable to get userId');

  try {
    const student = await Student.findOneOrFail({
      where: { user: { uuid: userId } },
      relations: { user: true }
    });

    const assignment = await Assignment.findOneOrFail({
      where: { uuid: id }
    });

    const submission = await Submission.findOneOrFail({
      where: {
        student: { uuid: student.uuid },
        assignment: { uuid: assignment.uuid },
        submittedAt: IsNull()
      }
    });

    if (submission.submittedAt) {
      res.status(400).json({ message: 'You have already submitted this assignment.' });
      return;
    }

    const now = new Date();
    const dueDate = new Date(assignment.dueDate);

    submission.content = content;
    submission.submittedAt = new Date();
    submission.status =
      now > dueDate ? AssignmentStatus.SUBMITTED_LATE : AssignmentStatus.SUBMITTED;

    await submission.save();

    res.status(201).json({ message: 'Assignment submitted successfully.', submission });
    return;
  } catch (err) {
    console.error('Error submitting assignment:', err);
    res.status(500).json({ message: 'Failed to submit assignment.' });
    return;
  }
};

export const fetchAssignmentWithSubmission = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const userId = req.user?.uuid;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const studentClass = await StudentClass.findOneOrFail({
      where: { class: { uuid: classId }, student: { user: { uuid: userId } } },
      relations: { student: { user: true } }
    });

    const classEntity = await Class.findOneOrFail({
      where: {
        studentClasses: { uuid: studentClass.uuid },
        assignments: {
          submissions: {
            student: {
              uuid: studentClass.student.uuid
            }
          }
        }
      },
      relations: {
        assignments: {
          submissions: {
            student: true
          }
        }
      }
    });

    res.status(200).json(classEntity);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load assignment details' });
    return;
  }
};
