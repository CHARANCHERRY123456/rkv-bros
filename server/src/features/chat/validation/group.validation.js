import { z } from 'zod';

const emailSchema = z.string().email('Invalid email format');

export const getUserGroupsSchema = z.object({
  params: z.object({
    email: emailSchema
  })
});

export const createGroupSchema = z.object({
  body: z.object({
    name: z.string()
      .min(1, 'Group name is required')
      .max(100, 'Group name cannot exceed 100 characters')
      .trim(),
    members: z.array(emailSchema)
      .min(1, 'At least one member is required')
      .max(256, 'Cannot add more than 256 members'),
    description: z.string()
      .max(500, 'Description cannot exceed 500 characters')
      .optional()
  })
});

export const getGroupDetailsSchema = z.object({
  params: z.object({
    groupId: z.string()
      .min(1, 'Group ID is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid group ID format')
  })
});

export const updateGroupActivitySchema = z.object({
  params: z.object({
    groupId: z.string()
      .min(1, 'Group ID is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid group ID format')
  })
});

// Add members to group validation
export const addMembersToGroupSchema = z.object({
  params: z.object({
    groupId: z.string()
      .min(1, 'Group ID is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid group ID format')
  }),
  body: z.object({
    members: z.array(emailSchema)
      .min(1, 'At least one member is required')
      .max(50, 'Cannot add more than 50 members at once')
  })
});
