import { Request, Response } from 'express';
import { User } from '../../models';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.user ?? {};

    if (!uuid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findOne({
      where: { uuid }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
    return;
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, age, email } = req.body;
    const { uuid } = req.user ?? {};

    if (!uuid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = await User.findOne({ where: { uuid } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (age !== undefined) user.age = age;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
    return;
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
    return;
  }
};
