type Props = {
  count: number;
  icon: JSX.Element;
  label: string;
  className?: string;
};

export default function Badge(props: Props) {
  return (
    <span
      className={`flex items-center py-1 px-2 ml-2 rounded ${
        props.className || ""
      }`}
      aria-label={props.label}
    >
      {props.icon}
      <span className="ml-1 -mt-0.5">{props.count}</span>
    </span>
  );
}
