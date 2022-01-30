import type { Inspection } from "../types";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "../components/Card";
import InspectionsChart from "../components/InspectionsChart";
import InspectionsDescriptions from "../components/InspectionsDescriptions";
import { fetchActiveInspections } from "../api/ActiveInspections";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import Loader from "../components/Loader";

const Home: NextPage = () => {
  const router = useRouter();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);

  // Load page data
  useEffect(() => {
    fetchResults();
  }, []);

  // Build select parameter for API query
  const getSelectParam = () => {
    let select = [
      ":id AS id",
      "facility",
      "nys_health_operation_id AS operation_id",
      "date_of_inspection AS date",
      "violation_description as description",
      "critical_violation as type",
      "violation_item",
      "total_critical_violations AS violations",
      "total_noncritical_violations AS warnings",
      "facility_address AS address",
      "facility_city AS city",
      "facility_postal_zipcode AS zip_code",
    ];

    return select.join(",");
  };

  // Fetch inspections from API
  const fetchResults = async () => {
    setLoading(true);

    const inspections = await fetchActiveInspections({
      nys_health_operation_id: router.query.id,
      $select: getSelectParam(),
      $order: "date, type",
    });

    setInspections(inspections);
    setLoading(false);
  };

  if (loading || !inspections.length) {
    return <Loader />;
  }

  const inspection = inspections[0];

  return (
    <>
      <div className="sticky top-0 bg-slate-100 border-b-2 border-slate-200 flex items-center px-2 py-4 sm:px-0 mb-8 -mx-3">
        <Link href="/">
          <a>
            <ChevronLeftIcon className="h-8 w-8 mt-0.5 text-slate-400 mr-2 sm:mr-4" />
          </a>
        </Link>
        <div>
          <h1 className="text-lg md:text-2xl">{inspection.facility}</h1>
          <div className="flex-1 text-xs sm:text-sm mt-1">
            {inspection.address} &bull; {inspection.city}, {inspection.zip_code}
          </div>
        </div>
      </div>
      <div className="sm:px-1">
        <Card title="Violations" className="mb-6">
          <InspectionsChart inspections={inspections} />
        </Card>
        <InspectionsDescriptions inspections={inspections} />
      </div>
    </>
  );
};

export default Home;
