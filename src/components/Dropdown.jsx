import React from "react";

const Dropdown = ({ statusdata, onChange, placeholder }) => {
  return (
    <select
      className="shadow-lg border-2 p-2 rounded cursor-pointer "
      onChange={(e) => onChange(e.target.value)}
      id="select_status"
    >
      <option value="" selected disabled>
        {placeholder}
      </option>
      {statusdata.map((status, index) => {
        return (
          <option key={index} value={status}>
            {status}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
