import React from "react";

const Dropdown = ({ statusdata = [], onChange, value }) => {
  return (
    <div>
      <label htmlFor="updatestatus" className="font-medium text-sm">
        Update Status
      </label>
      <select
        id="updatestatus"
        name="updatestatus"
        className="w-full border-2 p-2 text-sm"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        required
      >
        <option value="" disabled selected>
          Select Status
        </option>
        {statusdata.map((status) => (
          <option key={status.id || status} value={status.id || status}>
            {status.name || status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
