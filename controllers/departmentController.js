import departmentService from '../services/departmentService.js';

async function getAllDepartments(req, res, next) {
    try {
        const departments = await departmentService.getAllDepartments();
        res.json(departments);
    } catch (error) {
        next(error);
    }
}

async function getDepartmentById(req, res, next) {
    const id = parseInt(req.params.id)

    try {
        const department = await departmentService.getDepartmentById(id);
        res.json(department);
    } catch (error) {
        next(error);
    }
}

export default {
    getAllDepartments,
    getDepartmentById,
}
