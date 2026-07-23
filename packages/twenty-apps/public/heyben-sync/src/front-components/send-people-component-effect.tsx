import { useEffect, useMemo, useState } from 'react';
import { defineFrontComponent } from 'twenty-sdk/define';
import {
  Command,
  enqueueSnackbar,
  useSelectedRecordIds,
} from 'twenty-sdk/front-component';
import { RestApiClient } from 'twenty-client-sdk/rest';

import {
  HEYBEN_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS,
  HEYBEN_LOGIC_FUNCTION_CONSTANTS,
} from 'src/constants/universal-identifiers';

type WhoAmI = {
  companyId: string;
  companyName: string;
  keyPrefix: string;
};

const SendPeople = () => {
  const recordIds = useSelectedRecordIds();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [whoami, setWhoami] = useState<WhoAmI | null>(null);
  const [whoamiError, setWhoamiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSelected(recordIds);
    setWhoami(null);
    setWhoamiError(null);

    const client = new RestApiClient();
    void client
      .post(`/s${HEYBEN_LOGIC_FUNCTION_CONSTANTS.resolveTarget.path}`, {})
      .then((data) => setWhoami(data as WhoAmI))
      .catch((err: unknown) => {
        setWhoamiError(
          err instanceof Error
            ? err.message
            : 'Could not resolve HeyBen company from API key',
        );
      });
  }, [open, recordIds]);

  const selectedCount = selected.length;
  const title = useMemo(
    () =>
      whoami?.companyName
        ? `Convert to customers in ${whoami.companyName}`
        : 'Convert prospects to customers',
    [whoami?.companyName],
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const submit = async () => {
    if (selected.length === 0) return;
    setSubmitting(true);
    try {
      const client = new RestApiClient();
      await client.post(`/s${HEYBEN_LOGIC_FUNCTION_CONSTANTS.sendPeople.path}`, {
        recordIds: selected,
        convertProspectsToCustomers: true,
      });
      await enqueueSnackbar({
        message:
          selected.length > 1
            ? `Sent ${selected.length} contacts as customers.`
            : 'Sent contact as a customer.',
        variant: 'success',
      });
      setOpen(false);
    } catch {
      await enqueueSnackbar({
        message: 'Failed to send contacts to HeyBen',
        variant: 'error',
      });
    } finally {
      setSubmitting(false);
    }
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
          data-testid="heyben-sync-send-dialog"
        >
          <div
            style={{
              width: '100%',
              maxWidth: 480,
              borderRadius: 16,
              background: '#fff',
              padding: 20,
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            }}
          >
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{title}</h2>
            <p style={{ margin: '8px 0 0', fontSize: 13, color: '#64748b' }}>
              Choose which contacts to send. They become customers in the HeyBen
              company bound to your API key. Matching Office leads convert from
              prospect → customer.
            </p>

            {whoami ? (
              <p
                style={{ margin: '12px 0 0', fontSize: 12, color: '#0f766e' }}
                data-testid="heyben-sync-send-company"
              >
                Company: {whoami.companyName}
                <br />
                ID: {whoami.companyId}
                <br />
                Key: {whoami.keyPrefix}
              </p>
            ) : null}
            {whoamiError ? (
              <p
                style={{ margin: '12px 0 0', fontSize: 12, color: '#b91c1c' }}
                data-testid="heyben-sync-send-error"
              >
                {whoamiError}
              </p>
            ) : null}

            <div
              style={{
                marginTop: 16,
                maxHeight: 220,
                overflow: 'auto',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 8,
              }}
              data-testid="heyben-sync-send-contacts"
            >
              {recordIds.map((id) => (
                <label
                  key={id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 8px',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                  data-testid={`heyben-sync-send-contact-${id}`}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(id)}
                    onChange={() => toggle(id)}
                  />
                  <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
                    {id}
                  </span>
                </label>
              ))}
            </div>

            <div
              style={{
                marginTop: 16,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 8,
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={submitting}
                data-testid="heyben-sync-send-cancel-button"
                style={{
                  border: 'none',
                  borderRadius: 10,
                  padding: '8px 14px',
                  background: '#f1f5f9',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void submit()}
                disabled={
                  submitting || selectedCount === 0 || Boolean(whoamiError)
                }
                data-testid="heyben-sync-send-submit-button"
                style={{
                  border: 'none',
                  borderRadius: 10,
                  padding: '8px 14px',
                  background: '#0f766e',
                  color: '#fff',
                  cursor: 'pointer',
                  opacity: submitting || selectedCount === 0 ? 0.6 : 1,
                }}
              >
                {submitting
                  ? 'Sending…'
                  : `Convert ${selectedCount} to customers`}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default defineFrontComponent({
  universalIdentifier: HEYBEN_FRONT_COMPONENT_UNIVERSAL_IDENTIFIERS.sendPeople,
  name: 'send-people-effect',
  description: 'Review and convert selected people to HeyBen customers',
  component: SendPeople,
  isHeadless: true,
});
