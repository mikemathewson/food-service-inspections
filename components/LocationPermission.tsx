import { useState, useEffect } from "react";

type Props = {
  setPosition: Function;
};

export default function SetLocation({ setPosition }: Props) {
  const [permissionState, setPermissionState] = useState("");

  const handleGrantPermission = () => {
    navigator.geolocation.getCurrentPosition((p) => {
      setPosition(p);
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          setPermissionState(result.state);

          const permissionListener = (result.onchange = () => {
            setPermissionState(result.state);
          });

          if (result.state === "granted") {
            handleGrantPermission();
          }

          return () => {
            result.removeEventListener("onchange", permissionListener);
          };
        });
    }
  }, []);

  if (permissionState !== "prompt") {
    return null;
  }

  return (
    <div className="sm:flex items-center bg-amber-50 border border-amber-500 text-amber-800 p-4 mb-6">
      <span className="flex-1 sm:mr-4">
        Enable location for more relevant results
      </span>
      <div className="mt-4 sm:mt-0">
        <button
          type="button"
          className="bg-amber-700 text-white py-2 px-4 ml-auto"
          onClick={handleGrantPermission}
        >
          Allow
        </button>
      </div>
    </div>
  );
}
