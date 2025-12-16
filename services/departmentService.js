import departmentRepository from '../repositories/departmentRepository.js';

async function getAllDepartments() {
    return await departmentRepository.findAll();
}

async function getDepartmentById(id) {
    return await departmentRepository.findById(id);
}

export default {
    getAllDepartments,
    getDepartmentById,
}
