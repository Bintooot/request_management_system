import React from "react";

const Dropdown = ({ statusdata, onChange, value }) => {
  return (
    <div>
      <select
        className="w-full border-2 p-2 text-sm"
        required
        onChange={(e) => onChange(e.target.value)}
        value={value || ""}
      >
        {statusdata.map((status, index) => (
          <option key={index} value={status} disabled={index === 0}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
