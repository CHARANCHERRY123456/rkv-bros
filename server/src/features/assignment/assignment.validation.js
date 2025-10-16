import { z } from 'zod';

export const createAssignmentSchema = z.object({
  body: z.object({
    assignmentName: z.string().min(1, 'Assignment name is required'),
    courseId: z.string().optional(),
    dueDate: z.string().optional(),
    questions: z.array(z.object({
      questionNumber: z.number().optional(),
      questionText: z.string().min(1, 'Question text is required'),
      questionType: z.enum(['mcq', 'numeric']).default('mcq'),
      options: z.array(z.object({
        optionText: z.string(),
        selections: z.record(z.boolean()).optional(),
        voteCount: z.number().default(0)
      })),
      adminChoice: z.array(z.number()).optional(),
      totalVotes: z.number().default(0)
    }))
  })
});

export const submitVoteSchema = z.object({
  params: z.object({
    assignmentName: z.string().min(1, 'Assignment name is required')
  }),
  body: z.object({
    questionIndex: z.number().int().min(0, 'Question index must be a non-negative integer'),
    optionIndex: z.number().int().min(0, 'Option index must be a non-negative integer'),
    email: z.string().email('Invalid email format')
  })
});

export const getAssignmentSchema = z.object({
  params: z.object({
    assignmentName: z.string().min(1, 'Assignment name is required')
  })
});

export const updateAssignmentSchema = z.object({
  params: z.object({
    assignmentName: z.string().min(1, 'Assignment name is required')
  }),
  body: z.object({
    assignmentName: z.string().optional(),
    courseId: z.string().optional(),
    dueDate: z.string().optional(),
    questions: z.array(z.any()).optional()
  })
});

export const resetVotesSchema = z.object({
  params: z.object({
    assignmentName: z.string().min(1, 'Assignment name is required')
  })
});

export const deleteAssignmentSchema = z.object({
  params: z.object({
    assignmentName: z.string().min(1, 'Assignment name is required')
  })
});