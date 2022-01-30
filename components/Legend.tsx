import {
  XCircleIcon,
  ExclamationIcon,
  CheckCircleIcon,
} from "@heroicons/react/solid";

export default function Legend() {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-center sm:justify-end">
        <div className="text-center flex flex-col sm:flex-row items-center">
          <XCircleIcon className="h-4 w-4 mr-1 mt-0.5 text-rose-800" />
          <span className="text-xs sm:text-sm">Critical violations</span>
        </div>
        <div className="text-center flex flex-col sm:flex-row items-center ml-6">
          <ExclamationIcon className="h-4 w-4 sm:mr-1 sm:mt-0.5 text-amber-700" />
          <span className="text-xs sm:text-sm">Non-critical violations</span>
        </div>
        <div className="text-center flex flex-col sm:flex-row items-center ml-6">
          <CheckCircleIcon className="h-4 w-4 sm:mr-1 sm:mt-0.5 text-emerald-700" />
          <span className="text-xs sm:text-sm">No violations</span>
        </div>
      </div>
    </div>
  );
}
