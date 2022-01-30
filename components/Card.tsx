type Props = {
  title: string;
  children: JSX.Element;
  className?: string;
};

export default function FacilityList(props: Props) {
  return (
    <div
      className={`bg-white overflow-hidden shadow sm:rounded-lg ${props.className}`}
    >
      <>
        <div className="border-b-2 border-gray-100 px-4 sm:px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
          {props.title}
        </div>
        <div className="px-4 sm:px-6 py-3">{props.children}</div>
      </>
    </div>
  );
}
