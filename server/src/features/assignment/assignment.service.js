import assignmentRepository from './assignment.repository.js';
import { NotFoundError } from '../../middlewares/errorHandler.js';
import { ADMIN } from '../../config/config.js';

class AssignmentService {
  
  async createAssignment(data) {
    return await assignmentRepository.create(data);
  }

  async getAllAssignments() {
    return await assignmentRepository.find({});
  }

  async getAssignmentByName(assignmentName) {
    const assignment = await assignmentRepository.findByName(assignmentName);
    if (!assignment) {
      throw new NotFoundError('Assignment not found');
    }
    return assignment;
  }

  async submitVote(assignmentName, questionIndex, optionIndex, email) {
    const assignment = await assignmentRepository.findByName(assignmentName);
    if (!assignment) {
      throw new NotFoundError('Assignment not found');
    }

    // Business logic validation - check if indices exist
    if (questionIndex >= assignment.questions.length) {
      throw new NotFoundError('Question not found');
    }

    const question = assignment.questions[questionIndex];
    if (optionIndex >= question.options.length) {
      throw new NotFoundError('Option not found');
    }

    // Toggle vote
    const isAdmin = email === ADMIN;
    const updatedAssignment = await assignmentRepository.toggleVote(
      assignmentName,
      questionIndex,
      optionIndex,
      email,
      isAdmin
    );

    return updatedAssignment;
  }

  async resetVotes(assignmentName) {
    const assignment = await assignmentRepository.resetVotes(assignmentName);
    if (!assignment) {
      throw new NotFoundError('Assignment not found');
    }
    return assignment;
  }

  async updateAssignment(assignmentName, data) {
    const assignment = await assignmentRepository.updateByName(assignmentName, data);
    if (!assignment) {
      throw new NotFoundError('Assignment not found');
    }
    return assignment;
  }

  async deleteAssignment(assignmentName) {
    const assignment = await assignmentRepository.deleteByName(assignmentName);
    if (!assignment) {
      throw new NotFoundError('Assignment not found');
    }
    return { message: 'Assignment deleted successfully' };
  }
}

export default new AssignmentService();
