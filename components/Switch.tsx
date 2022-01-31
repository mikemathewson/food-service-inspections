type Props = {
  id: string;
  label: string;
  checked: boolean;
  toggle: Function;
};

export default function Switch({ id, label, checked, toggle }: Props) {
  return (
    <div className="flex items-center">
      <div
        className={`flex p-0.5 w-9 rounded-full cursor-pointer shadow-sm ${
          checked ? "bg-slate-700 justify-end" : "bg-gray-300"
        }`}
        onClick={() => toggle()}
      >
        <input
          className="sr-only"
          type="checkbox"
          role="switch"
          id={id}
          defaultChecked={checked}
          onChange={() => toggle()}
        />
        <div className="bg-white rounded-full w-4 h-4" />
      </div>
      <label
        className="ml-2 cursor-pointer"
        htmlFor={id}
        onClick={() => toggle()}
      >
        {label}
      </label>
    </div>
  );
}
