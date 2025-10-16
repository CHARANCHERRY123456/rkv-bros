import CrudRepository from '../../repositories/CrudRepository.js';
import Assignment from './assignment.model.js';

class AssignmentRepository extends CrudRepository {
  constructor() {
    super(Assignment);
  }

  async findByName(assignmentName) {
    return await this.findOne({ assignmentName });
  }

  async toggleVote(assignmentName, questionIndex, optionIndex, email, isAdmin) {
    const assignment = await this.findByName(assignmentName);
    if (!assignment) return null;

    const question = assignment.questions[questionIndex];
    const option = question.options[optionIndex];

    // Admin logic: mark correct answer
    if (isAdmin) {
      question.adminChoice = question.adminChoice.includes(optionIndex)
        ? question.adminChoice.filter(index => index !== optionIndex)
        : [...question.adminChoice, optionIndex];
    }

    option.selections = option.selections || {};
    const hasVoted = option.selections[email];

    if (hasVoted) {
      option.voteCount -= 1;
      question.totalVotes -= 1;
      delete option.selections[email];
    } else {
      option.voteCount += 1;
      question.totalVotes += 1;
      option.selections[email] = true;
    }

    assignment.markModified('questions');
    await assignment.save();
    return assignment;
  }

  async resetVotes(assignmentName) {
    const assignment = await this.findByName(assignmentName);
    if (!assignment) return null;

    assignment.questions.forEach(question => {
      question.options.forEach(option => {
        option.voteCount = 0;
        option.selections = {};
      });
      question.totalVotes = 0;
    });

    await assignment.save();
    return assignment;
  }

  async updateByName(assignmentName, data) {
    return await this.model.findOneAndUpdate(
      { assignmentName },
      data,
      { new: true, runValidators: true }
    );
  }

  async deleteByName(assignmentName) {
    return await this.model.findOneAndDelete({ assignmentName });
  }
}

export default new AssignmentRepository();
