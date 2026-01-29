import React from 'react';

export interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  disabled = false,
}: InputProps) => (
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${disabled ? 'bg-gray-100' : 'bg-white'}`}
    />
  </div>
);

export interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export const Textarea = ({ label, name, value, onChange, rows = 3 }: TextareaProps) => (
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-pre-wrap"
    />
  </div>
);
