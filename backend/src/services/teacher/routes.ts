import { Request, Response } from 'express';
import { Class, Teacher, Assignment, Submission } from '../../models';

export const getTeacherClasses = async (req: Request, res: Response) => {
  try {
    const teacherUserUuid = req.user?.uuid;

    if (!teacherUserUuid) {
      res.status(400).json({ message: 'Missing teacher account ID' });
      return;
    }

    const teacher = await Teacher.findOne({
      where: { user: { uuid: teacherUserUuid } },
      relations: { user: true }
    });

    if (!teacher) {
      console.error('Teacher not found');
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    const classes = await Class.find({
      where: { teacher: teacherUserUuid }
    });

    const classMapped = classes.map(classEntity => ({
      uuid: classEntity.uuid,
      class: classEntity
    }));

    res.status(200).json(classMapped);
    return;
  } catch (err) {
    console.error('Error fetching teacher classes:', err);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const getSubmissionsByClass = async (req: Request, res: Response) => {
  const { courseUuid } = req.params;

  try {
    const assignments = await Assignment.find({
      where: { class: { uuid: courseUuid } },
      relations: {
        submissions: {
          student: {
            user: true
          }
        },
        class: true
      }
    });

    const allSubmissions = assignments.flatMap(assignment =>
      assignment.submissions.map(submission => ({
        assignment: {
          title: assignment.title
        },
        student: {
          user: {
            firstName: submission.student.user.firstName,
            lastName: submission.student.user.lastName
          }
        },
        content: submission.content,
        submittedAt: submission.submittedAt,
        grade: submission.grade,
        uuid: submission.uuid
      }))
    );

    res.status(200).json(allSubmissions);
    return;
  } catch (error) {
    console.error('Error fetching submissions by class:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const gradeSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { grade } = req.body;

  if (!grade) {
    res.status(400).json({ message: 'Grade is required' });
    return;
  }

  try {
    const submission = await Submission.findOneOrFail({
      where: { uuid: id },
      relations: ['assignment', 'student']
    });

    submission.grade = grade;
    await submission.save();

    res.status(200).json({ message: 'Submission graded successfully', submission });
    return;
  } catch (err) {
    console.error('Failed to grade submission:', err);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
