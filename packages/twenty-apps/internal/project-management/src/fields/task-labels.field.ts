import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const TASK_LABELS_FIELD_ID = '2f95a6c1-8d47-4e03-b592-17c40ea86b39';

/**
 * ClickUp-style tags. MULTI_SELECT rather than a Label object: labels are a
 * closed vocabulary the team edits in Settings, not records with their own
 * fields, and MULTI_SELECT is filterable and colour-coded in views for free.
 *
 * The seed set below is a starting point — add, rename or recolour in
 * Settings → Data model → Task → Labels.
 */
export default defineField({
  universalIdentifier: TASK_LABELS_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.task.universalIdentifier,
  type: FieldType.MULTI_SELECT,
  name: 'labels',
  label: 'Labels',
  icon: 'IconTags',
  isNullable: true,
  options: [
    {
      id: '8b247e50-9c31-4a68-8f27-05d13be79a24',
      value: 'BUG',
      label: 'Bug',
      position: 0,
      color: 'red',
    },
    {
      id: '3e9c1a75-4d80-4b26-92f1-60c85e70a3d4',
      value: 'FEATURE',
      label: 'Feature',
      position: 1,
      color: 'blue',
    },
    {
      id: 'd5f80b93-7a16-4c42-8e05-21b96d4370fa',
      value: 'IMPROVEMENT',
      label: 'Improvement',
      position: 2,
      color: 'green',
    },
    {
      id: '70c3e921-6b58-4a07-9d34-8f15c2b60e47',
      value: 'BLOCKED',
      label: 'Blocked',
      position: 3,
      color: 'orange',
    },
    {
      id: 'a16d4b82-5e70-4c19-93af-6b28d017e5c4',
      value: 'URGENT_ATTENTION',
      label: 'Needs attention',
      position: 4,
      color: 'purple',
    },
  ],
});
