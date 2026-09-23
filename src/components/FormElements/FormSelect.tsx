import { FC } from "preact/compat";
import { css } from "@emotion/react";

const selectStyle = css({
  boxSizing: "border-box",
  minWidth: "140px",
  minHeight: "48px",
  padding: "0 12px",
  border: "1px solid var(--outline-color, #797979)",
  borderRadius: "6px",
  background: "var(--input-fill-color, var(--card-background-color, #fff))",
  color: "var(--primary-text-color)",
  font: "inherit",
  cursor: "pointer",
  "&:focus-visible": {
    outline: "2px solid var(--primary-color)",
    outlineOffset: "2px",
  },
});

const fullWidthStyle = css({ width: "100%" });

export type FormSelect = {
  options: { name: string; value: string }[];
  onSelected: (value: string) => void;
  selected: string;
  fullWidth?: boolean;
};

export const FormSelect: FC<FormSelect> = ({
  options,
  onSelected,
  selected,
  fullWidth = false,
}) => {
  return (
    <select
      css={[selectStyle, fullWidth && fullWidthStyle]}
      value={selected}
      onChange={e => onSelected((e.target as HTMLSelectElement).value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
