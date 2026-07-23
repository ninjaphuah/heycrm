type SelectOptionMeta = {
  key: string;
  value: string;
  label: string;
  color: string;
  position: number;
};

export const buildSelectOptions = ({
  meta,
  ids,
}: {
  meta: readonly SelectOptionMeta[];
  ids: Record<string, string>;
}) =>
  meta.map(({ key, value, label, color, position }) => ({
    id: ids[key],
    value,
    label,
    color,
    position,
  }));
