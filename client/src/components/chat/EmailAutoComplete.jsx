import React from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import envVars from '../../config/config.js';
const backendUrl = envVars.VITE_BASE_URL;

export default function EmailAutoComplete({ value, onChange, excludeEmails = [] }) {
  // Load options from backend
  const loadOptions = async (inputValue, callback) => {
    if (!inputValue || inputValue.length < 2) return callback([]);
    try {
      const res = await axios.get(`${backendUrl}/api/search/suggest`, {
        params: { q: inputValue, limit: 5 },
        withCredentials: true,
      });
      const options = res.data.data.suggestions
        .filter(user => !excludeEmails.includes(user.email))
        .map(user => ({
          value: user.email,
          label: `${user.name} <${user.email}>`,
        }));
      callback(options);
    } catch (err) {
      callback([]);
    }
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions={false}
      loadOptions={loadOptions}
      value={value}
      onChange={onChange}
      placeholder="Add members by email..."
      styles={{ menu: base => ({ ...base, zIndex: 9999 }) }}
    />
  );
}
