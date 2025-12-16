import departmentService from '../services/departmentService.js';

async function getAllDepartments(req, res) {
    try {
        const departments = await departmentService.getAllDepartments();
        res.json(departments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getDepartmentById(req, res) {
    const id = parseInt(req.params.id)

    try {
        const department = await departmentService.getDepartmentById(id);
        res.json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    getAllDepartments,
    getDepartmentById,
}
