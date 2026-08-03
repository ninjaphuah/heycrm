import { useCallback, useEffect, useMemo, useState } from 'react';
import { RestApiClient } from 'twenty-client-sdk/rest';
import { defineFrontComponent } from 'twenty-sdk/define';
import {
  Command,
  enqueueSnackbar,
  useColorScheme,
  useSelectedRecordIds,
  useUserId,
} from 'twenty-sdk/front-component';

import { ASSIGN_MEMBERS_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

type WorkspaceMember = {
  id: string;
  name: { firstName: string | null; lastName: string | null } | null;
  userEmail: string | null;
  avatarUrl: string | null;
  jobTitle: string | null;
  userId: string | null;
};

type TaskAssignment = {
  id: string;
  taskId: string | null;
  memberId: string | null;
  assignmentRole: string | null;
};

const ROLES = [
  { value: 'ASSIGNEE', label: 'Assignee' },
  { value: 'REVIEWER', label: 'Reviewer' },
  { value: 'APPROVER', label: 'Approver' },
  { value: 'COLLABORATOR', label: 'Collaborator' },
  { value: 'OBSERVER', label: 'Observer' },
];

const memberLabel = (member: WorkspaceMember) => {
  const first = member.name?.firstName?.trim() ?? '';
  const last = member.name?.lastName?.trim() ?? '';
  const full = `${first} ${last}`.trim();

  return full.length > 0 ? full : (member.userEmail ?? member.id);
};

/**
 * The ClickUp-style assign UX: one picker, tick several people, save once.
 *
 * Twenty has no MANY_TO_MANY relation, so multi-assignee is a taskAssignment
 * junction row per person. Creating those by hand is the two-step flow this
 * component removes — it diffs the ticked set against what already exists and
 * issues one batch create plus one delete per removal.
 *
 * Bound to RECORD_SELECTION on Task, so it also works on a multi-row selection
 * in any task view: tick 5 tasks, assign 3 people, one action.
 */
const AssignMembers = () => {
  const taskIds = useSelectedRecordIds();
  const currentUserId = useUserId();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [existing, setExisting] = useState<TaskAssignment[]>([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [role, setRole] = useState('ASSIGNEE');
  const [search, setSearch] = useState('');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSingleTask = taskIds.length === 1;

  useEffect(() => {
    if (!open) {
      return;
    }

    setIsLoading(true);
    setLoadError(null);
    setSearch('');

    const client = new RestApiClient();

    const load = async () => {
      const membersResponse = await client.get<{
        data: { workspaceMembers: WorkspaceMember[] };
      }>('/rest/workspaceMembers', { query: { limit: 200 } });

      setMembers(membersResponse.data.workspaceMembers ?? []);

      // Pre-ticking only makes sense for a single task; on a bulk selection the
      // existing sets differ per task, so we start empty and purely add.
      if (!isSingleTask) {
        setExisting([]);
        setSelectedMemberIds([]);

        return;
      }

      const assignmentsResponse = await client.get<{
        data: { taskAssignments: TaskAssignment[] };
      }>('/rest/taskAssignments', {
        query: {
          filter: `taskId[eq]:${taskIds[0]}`,
          limit: 200,
        },
      });

      const rows = assignmentsResponse.data.taskAssignments ?? [];

      setExisting(rows);
      setSelectedMemberIds(
        rows
          .map((row) => row.memberId)
          .filter((id): id is string => id !== null),
      );
    };

    void load()
      .catch((error: unknown) => {
        setLoadError(
          error instanceof Error
            ? error.message
            : 'Could not load workspace members',
        );
      })
      .finally(() => setIsLoading(false));
  }, [open, isSingleTask, taskIds]);

  const toggle = useCallback((memberId: string) => {
    setSelectedMemberIds((previous) =>
      previous.includes(memberId)
        ? previous.filter((id) => id !== memberId)
        : [...previous, memberId],
    );
  }, []);

  const visibleMembers = useMemo(() => {
    const needle = search.trim().toLowerCase();

    if (needle.length === 0) {
      return members;
    }

    return members.filter((member) =>
      `${memberLabel(member)} ${member.userEmail ?? ''}`
        .toLowerCase()
        .includes(needle),
    );
  }, [members, search]);

  const submit = async () => {
    setIsSubmitting(true);

    try {
      const client = new RestApiClient();
      const existingMemberIds = existing
        .map((row) => row.memberId)
        .filter((id): id is string => id !== null);

      const memberIdsToAdd = selectedMemberIds.filter(
        (id) => !existingMemberIds.includes(id),
      );
      const rowsToRemove = existing.filter(
        (row) => row.memberId !== null && !selectedMemberIds.includes(row.memberId),
      );

      // The assigner is whoever is clicking Save. Resolved from the member list
      // already in hand rather than a second request; null if the acting user has
      // no workspace member row, which the field tolerates.
      const assignerId =
        members.find((member) => member.userId === currentUserId)?.id ?? null;

      const labelForMemberId = (memberId: string) => {
        const member = members.find((candidate) => candidate.id === memberId);

        return member === undefined ? memberId : memberLabel(member);
      };

      const rowsToCreate = taskIds.flatMap((taskId) =>
        memberIdsToAdd.map((memberId) => ({
          taskId,
          memberId,
          assignerId,
          assignmentRole: role,
          name: labelForMemberId(memberId),
        })),
      );

      if (rowsToCreate.length > 0) {
        await client.post('/rest/batch/taskAssignments', rowsToCreate);
      }

      // Batch destroy is not exposed for arbitrary id sets, so removals go one
      // by one. Only reachable on a single-task selection, where the list is small.
      for (const row of rowsToRemove) {
        await client.delete(`/rest/taskAssignments/${row.id}`);
      }

      if (rowsToCreate.length === 0 && rowsToRemove.length === 0) {
        await enqueueSnackbar({
          message: 'No changes to apply.',
          variant: 'info',
        });
        setOpen(false);

        return;
      }

      const added = rowsToCreate.length;
      const removed = rowsToRemove.length;
      const parts = [
        added > 0 ? `${added} assignment${added === 1 ? '' : 's'} added` : null,
        removed > 0 ? `${removed} removed` : null,
      ].filter((part): part is string => part !== null);

      await enqueueSnackbar({
        message: parts.join(', '),
        variant: 'success',
      });
      setOpen(false);
    } catch (error: unknown) {
      await enqueueSnackbar({
        message:
          error instanceof Error
            ? `Could not save assignments: ${error.message}`
            : 'Could not save assignments',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const palette = isDark
    ? {
        surface: '#181818',
        text: '#ebebeb',
        muted: '#999999',
        border: '#2f2f2f',
        subtle: '#222222',
        accent: '#4f9cf9',
      }
    : {
        surface: '#ffffff',
        text: '#1b1b1b',
        muted: '#6b6b6b',
        border: '#e3e3e3',
        subtle: '#f5f5f5',
        accent: '#1961ed',
      };

  return (
    <>
      <Command execute={() => setOpen(true)} />
      {open ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(15,23,42,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          data-testid="pm-assign-dialog"
        >
          <div
            style={{
              width: '100%',
              maxWidth: 460,
              borderRadius: 12,
              background: palette.surface,
              color: palette.text,
              padding: 20,
              boxShadow: '0 20px 50px rgba(0,0,0,0.28)',
            }}
          >
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
              {isSingleTask
                ? 'Assign members'
                : `Assign members to ${taskIds.length} tasks`}
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: palette.muted }}>
              {isSingleTask
                ? 'Tick everyone who should be on this task. Unticking removes their assignment.'
                : 'Members are added to every selected task. Existing assignments are left alone.'}
            </p>

            <div style={{ marginTop: 14 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 11,
                  color: palette.muted,
                  marginBottom: 4,
                }}
              >
                Role for people added now
              </label>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                data-testid="pm-assign-role-select"
                style={{
                  width: '100%',
                  padding: '7px 8px',
                  fontSize: 13,
                  borderRadius: 8,
                  border: `1px solid ${palette.border}`,
                  background: palette.surface,
                  color: palette.text,
                }}
              >
                {ROLES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search people…"
              data-testid="pm-assign-search"
              style={{
                marginTop: 12,
                width: '100%',
                padding: '7px 8px',
                fontSize: 13,
                borderRadius: 8,
                border: `1px solid ${palette.border}`,
                background: palette.surface,
                color: palette.text,
              }}
            />

            {loadError !== null ? (
              <p
                style={{ margin: '12px 0 0', fontSize: 12, color: '#d93025' }}
                data-testid="pm-assign-error"
              >
                {loadError}
              </p>
            ) : null}

            <div
              style={{
                marginTop: 12,
                maxHeight: 240,
                overflow: 'auto',
                border: `1px solid ${palette.border}`,
                borderRadius: 10,
                padding: 6,
              }}
              data-testid="pm-assign-member-list"
            >
              {isLoading ? (
                <p style={{ margin: 8, fontSize: 12, color: palette.muted }}>
                  Loading…
                </p>
              ) : null}
              {!isLoading && visibleMembers.length === 0 ? (
                <p style={{ margin: 8, fontSize: 12, color: palette.muted }}>
                  No matching people.
                </p>
              ) : null}
              {visibleMembers.map((member) => (
                <label
                  key={member.id}
                  data-testid={`pm-assign-member-${member.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 8px',
                    fontSize: 13,
                    borderRadius: 6,
                    cursor: 'pointer',
                    background: selectedMemberIds.includes(member.id)
                      ? palette.subtle
                      : 'transparent',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedMemberIds.includes(member.id)}
                    onChange={() => toggle(member.id)}
                  />
                  {member.avatarUrl !== null && member.avatarUrl !== '' ? (
                    <img
                      src={member.avatarUrl}
                      alt=""
                      width={20}
                      height={20}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: palette.subtle,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        color: palette.muted,
                      }}
                    >
                      {memberLabel(member).charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span style={{ flex: 1 }}>{memberLabel(member)}</span>
                  {member.jobTitle !== null && member.jobTitle !== '' ? (
                    <span style={{ fontSize: 11, color: palette.muted }}>
                      {member.jobTitle}
                    </span>
                  ) : null}
                </label>
              ))}
            </div>

            <div
              style={{
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 12, color: palette.muted }}>
                {selectedMemberIds.length} selected
              </span>
              <span style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                  data-testid="pm-assign-cancel-button"
                  style={{
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 14px',
                    fontSize: 13,
                    background: palette.subtle,
                    color: palette.text,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void submit()}
                  disabled={isSubmitting || isLoading}
                  data-testid="pm-assign-save-button"
                  style={{
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 14px',
                    fontSize: 13,
                    background: palette.accent,
                    color: '#ffffff',
                    cursor: isSubmitting ? 'progress' : 'pointer',
                    opacity: isSubmitting || isLoading ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? 'Saving…' : 'Save'}
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default defineFrontComponent({
  universalIdentifier: ASSIGN_MEMBERS_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  name: 'assign-members',
  description: 'Assign multiple workspace members to one or many tasks at once',
  component: AssignMembers,
});
