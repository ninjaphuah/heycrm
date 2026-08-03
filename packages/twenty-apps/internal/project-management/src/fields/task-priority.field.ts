import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const TASK_PRIORITY_FIELD_ID = 'd48fccf8-40d9-481c-9410-acb09a35aa46';

/**
 * The standard Task ships with title / bodyV2 / dueAt / status only — no
 * priority. Added here rather than patched into
 * compute-task-standard-flat-field-metadata.util.ts so upstream Twenty merges
 * stay clean.
 *
 * Mirrors the project priority scale so the two read the same way.
 */
export default defineField({
  universalIdentifier: TASK_PRIORITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  type: FieldType.SELECT,
  name: 'priority',
  label: 'Priority',
  icon: 'IconFlag',
  // Nullable on purpose: this lands on a tasks table that already has rows, and
  // a default only applies to inserts. Tasks created from now on get NORMAL;
  // pre-existing ones stay empty rather than being silently relabelled.
  isNullable: true,
  defaultValue: "'NORMAL'",
  options: [
    {
      id: '2200722f-4c4e-4e16-8f11-ed1e3dac91e2',
      value: 'LOW',
      label: 'Low',
      position: 0,
      color: 'gray',
    },
    {
      id: '12d97187-07fa-47f5-a4cb-063e5fd7fd8b',
      value: 'NORMAL',
      label: 'Normal',
      position: 1,
      color: 'blue',
    },
    {
      id: '6dbc4cc2-50c2-495a-b615-60a0b35f7f8b',
      value: 'HIGH',
      label: 'High',
      position: 2,
      color: 'orange',
    },
    {
      id: 'caf8f0b6-d5b3-4d07-a4d3-6b2f291a1356',
      value: 'URGENT',
      label: 'Urgent',
      position: 3,
      color: 'red',
    },
  ],
});
