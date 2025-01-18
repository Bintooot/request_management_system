import React from "react";

const Dropdown = ({ statusdata, placeholder, onChange, value }) => {
  return (
    <div>
      <select
        className="w-full border-2 p-2 text-sm"
        onChange={(e) => onChange(e.target.value)}
        value={value} // Use value to control the selected option
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {statusdata.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
