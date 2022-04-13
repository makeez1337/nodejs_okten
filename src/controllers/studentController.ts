import { NextFunction, Request, Response } from 'express';

import { studentModel } from '../models/student';

class StudentController {
    public async createStudent(req:Request, res:Response, next:NextFunction) {
        try {
            const createdStudent = await studentModel.create(req.body);

            res.json(createdStudent);
        } catch (e) {
            next(e);
        }
    }

    public async getStudents(req:Request, res:Response, next:NextFunction) {
        try {
            const students = await studentModel.find({}).populate('teacher');

            res.json(students);
        } catch (e) {
            next(e);
        }
    }

    public async selectTeacher(req:Request, res:Response, next:NextFunction) {
        try {
            const { id } = req.body;

            // @ts-ignore
            const updatedStudent = await studentModel.findByIdAndUpdate(
                id,
                { teacher: req.params.teacher_id },
                { new: true },
            );

            const student = await studentModel.findById(id).populate('teacher');

            res.json(student);
        } catch (e) {
            next(e);
        }
    }
}

export const studentController = new StudentController();
