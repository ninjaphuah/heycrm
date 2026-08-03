import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const TASK_STAGE_FIELD_ID = 'e37b1c95-8a04-4d72-b619-25f03e7c84a1';

/**
 * The ClickUp-style workflow column.
 *
 * Twenty's built-in Task.status is a standard field fixed at
 * TODO / IN_PROGRESS / DONE, and an app cannot append options to a standard
 * field's option set — so the four-stage workflow lives in its own field.
 * The built-in status is left alone; treat `stage` as the board column.
 *
 * These options are fully editable afterwards in Settings → Data model → Task →
 * Stage: rename them, recolour them, add or remove columns. App-defined fields
 * behave like custom fields once synced, so customising the workflow needs no
 * code change. The kanban view groups on this field, so new options show up as
 * new columns.
 */
export default defineField({
  universalIdentifier: TASK_STAGE_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  type: FieldType.SELECT,
  name: 'stage',
  label: 'Stage',
  icon: 'IconColumns',
  // Nullable for the same reason as priority: existing task rows predate this
  // field and a default only applies to inserts.
  isNullable: true,
  defaultValue: "'FINDINGS'",
  options: [
    {
      id: '4c8e2b71-9a35-4d60-8f17-2e05c93b4a68',
      value: 'FINDINGS',
      label: 'Findings',
      position: 0,
      color: 'gray',
    },
    {
      id: '1d70a4f8-6c29-4b53-90e8-53f7c02b6a94',
      value: 'IN_PROGRESS',
      label: 'In Progress',
      position: 1,
      color: 'blue',
    },
    {
      id: '9f52c806-3e17-4a94-b25d-70c81de6a439',
      value: 'IN_REVIEW',
      label: 'In Review',
      position: 2,
      color: 'orange',
    },
    {
      id: '6a13d5e0-7b48-4c91-82fa-14b7e5920c63',
      value: 'COMPLETED',
      label: 'Completed',
      position: 3,
      color: 'green',
    },
  ],
});
