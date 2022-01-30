import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

type Props = {
  page: number;
  perPage: number;
  total: number;
  setPage: Function;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export default function Pagination({ page, perPage, total, setPage }: Props) {
  if (total === 0) {
    return null;
  }

  const handlePreviousPage = () => {
    setPage(page - 1);
    scrollToTop();
  };

  const handleNextPage = () => {
    setPage(page + 1);
    scrollToTop();
  };

  const hasPrev = page > 1;
  const hasNext = total > perPage;

  return (
    <div className="flex items-center justify-center mt-8">
      <button
        type="button"
        className={`flex items-center bg-slate-900 text-white border py-2 px-4 rounded${
          !hasPrev ? " opacity-30" : ""
        }`}
        disabled={!hasPrev}
        onClick={handlePreviousPage}
      >
        <ChevronLeftIcon className="h-6 w-6 mt-0.5" />
      </button>
      <button
        type="button"
        className={`flex items-center bg-slate-900 text-white border py-2 px-4 rounded${
          !hasNext ? " opacity-30" : ""
        }`}
        disabled={!hasNext}
        onClick={handleNextPage}
      >
        <ChevronRightIcon className="h-6 w-6 mt-0.5" />
      </button>
    </div>
  );
}
