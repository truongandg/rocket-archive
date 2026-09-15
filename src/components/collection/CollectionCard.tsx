import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useLibraryStore } from "../../store/favorites";
import type { Collection } from "../../types/collection";
import type { Rocket } from "../../types/rocket";
import RocketCard from "../rocket/RocketCard";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";

interface CollectionCardProps {
  collection: Collection;
  rockets: Rocket[];
}

export default function CollectionCard({
  collection,
  rockets,
}: CollectionCardProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const deleteCollection = useLibraryStore((state) => state.deleteCollection);
  const addRocketToCollection = useLibraryStore(
    (state) => state.addRocketToCollection,
  );
  const collectionRockets = rockets.filter((rocket) =>
    collection.rocketIds.includes(rocket.id),
  );
  const availableRockets = rockets.filter(
    (rocket) => !collection.rocketIds.includes(rocket.id),
  );

  const addRocket = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rocketId = Number(new FormData(event.currentTarget).get("rocketId"));
    if (rocketId) addRocketToCollection(collection.id, rocketId);
    event.currentTarget.reset();
  };

  return (
    <article className="border border-white/15 p-5 md:p-7">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-[10px] font-semibold tracking-[.18em] text-white/40">
            PERSONAL COLLECTION
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-.04em]">
            {collection.name.toUpperCase()}
          </h2>
          <p className="mt-2 text-xs text-white/45">
            {collection.rocketIds.length}{" "}
            {collection.rocketIds.length === 1 ? "ROCKET" : "ROCKETS"}
          </p>
        </div>
        <Button
          onClick={() => setConfirmingDelete(true)}
          aria-label={`Delete ${collection.name}`}
          className="h-10 w-10 border-white/25 p-0 text-white/60 hover:text-black"
        >
          <Trash2 size={16} />
        </Button>
      </div>
      {collectionRockets.length ? (
        <>
          <p className="mt-7 text-[10px] font-semibold tracking-[.14em] text-white/40">
            USE THE COLLECTION ICON ON A ROCKET CARD TO REMOVE IT FROM THIS
            COLLECTION.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collectionRockets.map((rocket) => (
              <RocketCard key={rocket.id} rocket={rocket} />
            ))}
          </div>
        </>
      ) : (
        <p className="mt-7 border-t border-white/15 py-7 text-xs font-semibold tracking-[.14em] text-white/40">
          THIS COLLECTION IS EMPTY
        </p>
      )}
      {availableRockets.length > 0 && (
        <form
          onSubmit={addRocket}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <select
            name="rocketId"
            defaultValue=""
            className="h-11 min-w-0 flex-1 border border-white/25 bg-black px-4 text-xs text-white outline-none"
          >
            <option value="" disabled>
              ADD A SAVED ROCKET
            </option>
            {availableRockets.map((rocket) => (
              <option key={rocket.id} value={rocket.id}>
                {rocket.name}
              </option>
            ))}
          </select>
          <Button
            type="submit"
            className="h-11 px-5 text-[10px] font-bold tracking-[.14em]"
          >
            ADD ROCKET
          </Button>
        </form>
      )}
      <ConfirmDialog
        open={confirmingDelete}
        title="DELETE COLLECTION?"
        description={`“${collection.name}” and its saved rocket membership will be permanently removed.`}
        onClose={() => setConfirmingDelete(false)}
        onConfirm={() => {
          deleteCollection(collection.id);
          setConfirmingDelete(false);
        }}
      />
    </article>
  );
}
