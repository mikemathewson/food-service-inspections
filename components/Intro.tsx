export default function Welcome() {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <p className="mb-4">
          This data includes the name and location of active food service
          establishments and the violations that were found at the time of the
          inspection. Inspections are a snapshot in time and are not always
          reflective of the day-to-day operations and overall condition of an
          establishment!
        </p>
        <p className="mb-4">
          This search page will show data from the <strong>latest</strong>{" "}
          inspection only. Click on a result to see a history of violations for
          that facilty.
        </p>
      </div>
      <hr className="mt-2 mb-8 border-slate-200" />
    </div>
  );
}
