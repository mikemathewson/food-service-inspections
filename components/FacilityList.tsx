import type { Facility } from "../types";
import FacilityListItem from "./FacilityListItem";
import Legend from "./Legend";
import Pagination from "./Pagination";
import Loader from "./Loader";

type Props = {
  results: Facility[];
  page: number;
  perPage: number;
  loading: boolean;
  setPage: Function;
};

export default function FacilityList(props: Props) {
  if (props.loading) {
    return <Loader />;
  }
  return (
    <div>
      {props.results.length > 0 ? (
        <div>
          <Legend />
          {props.results.slice(0, props.perPage).map((item) => (
            <FacilityListItem item={item} key={item.id} />
          ))}
          <Pagination
            page={props.page}
            perPage={props.perPage}
            total={props.results.length}
            setPage={props.setPage}
          />
        </div>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}
