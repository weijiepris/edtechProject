// src/services/student/student.controller.ts

import { Request, Response } from 'express';
import { StudentClass } from '../../models/StudentClass.entity';
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
