import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineObject,
} from 'twenty-sdk/define';

import { TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export { TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER };

export const TASK_ASSIGNMENT_NAME_FIELD_ID =
  '8ceb7f91-e639-4587-a5af-9a302b02a421';
export const TASK_ASSIGNMENT_TASK_FIELD_ID =
  '03f84118-6fe3-4781-a539-4eea761c0231';
export const TASK_ASSIGNMENT_MEMBER_FIELD_ID =
  'b6a228eb-4c6e-437b-867b-d04f4c159c5a';
export const TASK_ASSIGNMENT_ROLE_FIELD_ID =
  '224d2e40-f028-4690-b7a1-a419c4364e45';
export const TASK_ASSIGNMENT_STATUS_FIELD_ID =
  '07f3715f-4f2f-4ec0-b8eb-9c650c67c54c';
export const TASK_ASSIGNMENT_DUE_DATE_FIELD_ID =
  'b245532b-0a41-442f-8062-a45323f6acaa';
export const TASK_ASSIGNMENT_ASSIGNER_FIELD_ID =
  '7e15a3c9-4d62-48b0-91fe-25c803b7d6a4';

/** Inverses, materialised on the two standard objects. */
export const TASK_ASSIGNMENTS_ON_TASK_FIELD_ID =
  'f729e171-6873-475a-a077-075f112b6bd3';
export const TASK_ASSIGNMENTS_ON_WORKSPACE_MEMBER_FIELD_ID =
  '4325d355-7cae-4e1f-9e86-8efb820cf43b';
export const TASK_ASSIGNMENTS_AS_ASSIGNER_ON_WORKSPACE_MEMBER_FIELD_ID =
  'd0b64f27-9a58-4e13-8c05-3f71e26b9a48';

/**
 * Junction object giving a Task many assignees.
 *
 * Twenty's engine has no MANY_TO_MANY relation type — RelationType is exactly
 * { MANY_TO_ONE, ONE_TO_MANY } — so a join object is the only way to model this,
 * and it is what Twenty's own docs prescribe. The upside over a plain multi-link
 * is that each assignment carries its own role, status and due date, so
 * "Alex reviews by Friday, Sam implements by Wednesday" is representable.
 *
 * The standard Task keeps its single `assignee` field; treat that as the
 * directly-responsible owner and these rows as everyone else.
 */
export default defineObject({
  universalIdentifier: TASK_ASSIGNMENT_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'taskAssignment',
  namePlural: 'taskAssignments',
  labelSingular: 'Task Assignment',
  labelPlural: 'Task Assignments',
  description:
    'Assignment of one team member to one task, with their role, status and due date',
  icon: 'IconUsers',
  isSearchable: true,
  labelIdentifierFieldMetadataUniversalIdentifier:
    TASK_ASSIGNMENT_NAME_FIELD_ID,
  fields: [
    {
      // Populated by the on-create logic function as "<task> — <member>" so the
      // record has a readable label in chips and search.
      universalIdentifier: TASK_ASSIGNMENT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Name',
      icon: 'IconAbc',
      defaultValue: "''",
    },
    {
      universalIdentifier: TASK_ASSIGNMENT_TASK_FIELD_ID,
      type: FieldType.RELATION,
      name: 'task',
      label: 'Task',
      icon: 'IconCheckbox',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
      relationTargetFieldMetadataUniversalIdentifier:
        TASK_ASSIGNMENTS_ON_TASK_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        // Assignments are meaningless without their task.
        onDelete: OnDeleteAction.CASCADE,
        joinColumnName: 'taskId',
      },
    },
    {
      universalIdentifier: TASK_ASSIGNMENT_MEMBER_FIELD_ID,
      type: FieldType.RELATION,
      name: 'member',
      label: 'Member',
      icon: 'IconUserCircle',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember
          .universalIdentifier,
      relationTargetFieldMetadataUniversalIdentifier:
        TASK_ASSIGNMENTS_ON_WORKSPACE_MEMBER_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        // Keep the history when someone leaves the workspace.
        onDelete: OnDeleteAction.SET_NULL,
        joinColumnName: 'memberId',
      },
    },
    {
      // The assigner: who put this person on the task. Filled automatically by
      // the Assign picker with the acting user, so "assigned to me by X" and
      // "everything I assigned out" are both answerable.
      universalIdentifier: TASK_ASSIGNMENT_ASSIGNER_FIELD_ID,
      type: FieldType.RELATION,
      name: 'assigner',
      label: 'Assigner',
      icon: 'IconUserShare',
      isNullable: true,
      relationTargetObjectMetadataUniversalIdentifier:
        STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.workspaceMember
          .universalIdentifier,
      relationTargetFieldMetadataUniversalIdentifier:
        TASK_ASSIGNMENTS_AS_ASSIGNER_ON_WORKSPACE_MEMBER_FIELD_ID,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.SET_NULL,
        joinColumnName: 'assignerId',
      },
    },
    {
      universalIdentifier: TASK_ASSIGNMENT_ROLE_FIELD_ID,
      type: FieldType.SELECT,
      // 'role' is a reserved field name in Twenty, hence the prefix.
      name: 'assignmentRole',
      label: 'Role',
      icon: 'IconUserCog',
      defaultValue: "'ASSIGNEE'",
      options: [
        {
          id: '6ff8c930-25f7-4fd8-82ac-42ba54a17334',
          value: 'ASSIGNEE',
          label: 'Assignee',
          position: 0,
          color: 'blue',
        },
        {
          id: '0b280722-e4f1-4354-a2b3-942d35ac0fa3',
          value: 'REVIEWER',
          label: 'Reviewer',
          position: 1,
          color: 'purple',
        },
        {
          id: '30dc5f89-1d9e-4061-aef3-7822d968e431',
          value: 'APPROVER',
          label: 'Approver',
          position: 2,
          color: 'orange',
        },
        {
          id: '4269eaaf-ec86-4792-ad61-1cad94466fe5',
          value: 'COLLABORATOR',
          label: 'Collaborator',
          position: 3,
          color: 'green',
        },
        {
          id: '74c6c238-27d2-4b12-a5a3-021d116402b7',
          value: 'OBSERVER',
          label: 'Observer',
          position: 4,
          color: 'gray',
        },
      ],
    },
    {
      universalIdentifier: TASK_ASSIGNMENT_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'status',
      label: 'Status',
      icon: 'IconProgressCheck',
      defaultValue: "'ASSIGNED'",
      options: [
        {
          id: 'bda405dd-f644-40ef-851d-5cef7fef8d41',
          value: 'ASSIGNED',
          label: 'Assigned',
          position: 0,
          color: 'gray',
        },
        {
          id: '870554b3-1a5e-411b-9c53-98b8ca9e8a83',
          value: 'ACCEPTED',
          label: 'Accepted',
          position: 1,
          color: 'blue',
        },
        {
          id: '7d9d86ac-95c0-46ac-be1c-6aae9b4b5368',
          value: 'IN_PROGRESS',
          label: 'In progress',
          position: 2,
          color: 'yellow',
        },
        {
          id: 'd9d043d0-a50b-49be-9f7b-749b74e2992c',
          value: 'DONE',
          label: 'Done',
          position: 3,
          color: 'green',
        },
        {
          id: 'bd56e320-9e3c-472d-b0a2-16f761d1171c',
          value: 'REJECTED',
          label: 'Rejected',
          position: 4,
          color: 'red',
        },
      ],
    },
    {
      // Per-person deadline. Falls back to the task's own dueAt when empty.
      universalIdentifier: TASK_ASSIGNMENT_DUE_DATE_FIELD_ID,
      type: FieldType.DATE,
      name: 'dueDate',
      label: 'Due date',
      icon: 'IconCalendarDue',
      isNullable: true,
    },
  ],
});
