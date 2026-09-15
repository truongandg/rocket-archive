import { FolderPlus, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLibraryStore } from "../../store/favorites";
import Button from "../ui/Button";

interface CollectionPickerProps {
  rocketId: number;
  rocketName: string;
  className?: string;
  label?: boolean;
}

export default function CollectionPicker({
  rocketId,
  rocketName,
  className = "",
  label = false,
}: CollectionPickerProps) {
  const [open, setOpen] = useState(false);
  const collections = useLibraryStore((state) => state.collections);
  const addRocketToCollection = useLibraryStore(
    (state) => state.addRocketToCollection,
  );
  const removeRocketFromCollection = useLibraryStore(
    (state) => state.removeRocketFromCollection,
  );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        aria-label={`Add ${rocketName} to a collection`}
        className={
          label
            ? `gap-2 px-4 text-[10px] font-bold tracking-[.14em] ${className}`
            : `h-9 w-9 border-white/30 bg-black/40 p-0 ${className}`
        }
      >
        <FolderPlus size={16} />
        {label && "COLLECTION"}
      </Button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`collection-picker-${rocketId}`}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/75 px-6 backdrop-blur-sm"
        >
          <div className="w-full max-w-md border border-white/25 bg-[#090909] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] font-semibold tracking-[.2em] text-white/45">
                  ORGANIZE ROCKET
                </p>
                <h2
                  id={`collection-picker-${rocketId}`}
                  className="mt-2 text-2xl font-semibold tracking-[-.04em]"
                >
                  {rocketName.toUpperCase()}
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                aria-label="Close dialog"
                className="h-9 w-9 p-0"
              >
                <X size={18} />
              </Button>
            </div>
            {collections.length ? (
              <div className="mt-7 border-t border-white/15">
                {collections.map((collection) => {
                  const included = collection.rocketIds.includes(rocketId);
                  return (
                    <label
                      key={collection.id}
                      className="flex cursor-pointer items-center justify-between gap-4 border-b border-white/15 py-4"
                    >
                      <span>
                        <span className="block text-sm font-semibold">
                          {collection.name}
                        </span>
                        <span className="mt-1 block text-[10px] font-semibold tracking-[.12em] text-white/40">
                          {collection.rocketIds.length} ROCKETS
                        </span>
                      </span>
                      <input
                        type="checkbox"
                        checked={included}
                        onChange={() =>
                          included
                            ? removeRocketFromCollection(
                                collection.id,
                                rocketId,
                              )
                            : addRocketToCollection(collection.id, rocketId)
                        }
                        className="h-4 w-4 accent-white"
                      />
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="mt-7 border-t border-white/15 py-7">
                <p className="text-sm leading-relaxed text-white/60">
                  Create a collection before adding this rocket.
                </p>
                <Link
                  to="/collections"
                  onClick={() => setOpen(false)}
                  className="mt-5 inline-block border border-white px-4 py-3 text-[10px] font-bold tracking-[.14em] hover:bg-white hover:text-black"
                >
                  GO TO COLLECTIONS
                </Link>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => setOpen(false)}
                className="px-5 py-3 text-[10px] font-bold tracking-[.14em]"
              >
                DONE
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
