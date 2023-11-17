import { useEffect, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

const RoomToClipboard = () => {
  const [copy, setCopy] = useState(false);

  const handleOnClick = () => {
    setCopy(true);
    navigator.clipboard.writeText(window.location.href);
  };

  useEffect(() => {
    if (copy) {
      setTimeout(() => setCopy(false), 1000);
    }
  }, [copy]);

  return (
    <button
      className="btn btn-info btn-circle absolute ml-5 mt-20"
      onClick={handleOnClick}
    >
      {copy ? (
        <FiCheck className="w-5 h-5 text-white" />
      ) : (
        <FiCopy className="w-5 h-5" />
      )}
    </button>
  );
};

export default RoomToClipboard;
