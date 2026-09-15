import RocketLoader from "../components/ui/RocketLoader";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import CollectionCard from "../components/collection/CollectionCard";
import CreateCollectionDialog from "../components/collection/CreateCollectionDialog";
import RocketCard from "../components/rocket/RocketCard";
import Button from "../components/ui/Button";
import useRocketsById from "../hooks/useRocketsById";
import { useLibraryStore } from "../store/favorites";

export default function CollectionsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const favouriteRocketIds = useLibraryStore(
    (state) => state.favouriteRocketIds,
  );
  const collections = useLibraryStore((state) => state.collections);
  const createCollection = useLibraryStore((state) => state.createCollection);
  const savedRocketIds = useMemo(
    () =>
      Array.from(
        new Set([
          ...favouriteRocketIds,
          ...collections.flatMap((collection) => collection.rocketIds),
        ]),
      ),
    [collections, favouriteRocketIds],
  );
  const { rockets, isLoading, isError } = useRocketsById(savedRocketIds);
  const favouriteRockets = rockets.filter((rocket) =>
    favouriteRocketIds.includes(rocket.id),
  );

  return (
    <div className="mx-auto max-w-[1600px] px-8 py-16 lg:px-12 lg:py-24">
      <div className="flex flex-col justify-between gap-7 border-b border-white/20 pb-10 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-semibold tracking-[.28em] text-white/45">
            PERSONAL ARCHIVE
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-.05em] md:text-5xl">
            COLLECTIONS
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
            Save the rockets that matter to you and organize them into your own
            mission archive.
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="h-12 gap-2 px-5 text-[10px] font-bold tracking-[.16em]"
        >
          <Plus size={16} /> NEW COLLECTION
        </Button>
      </div>
      <section className="pt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-[-.03em]">
            FAVOURITE ROCKETS
          </h2>
          <span className="text-[10px] font-semibold tracking-[.15em] text-white/45">
            {favouriteRocketIds.length} SAVED
          </span>
        </div>
        {isLoading && <RocketLoader label="Loading saved rockets..." />}
        {isError && (
          <p className="border-t border-white/15 py-10 text-xs font-semibold tracking-[.14em] text-white/40">
            UNABLE TO LOAD FAVOURITE ROCKETS
          </p>
        )}
        {!isLoading && !isError && favouriteRockets.length === 0 && (
          <p className="border-t border-white/15 py-10 text-xs font-semibold tracking-[.14em] text-white/40">
            NO FAVOURITE ROCKETS YET. SAVE ONE FROM THE EXPLORER TO START YOUR
            ARCHIVE.
          </p>
        )}
        {!isLoading && !isError && favouriteRockets.length > 0 && (
          <div className="grid grid-cols-1 gap-5 pt-7 sm:grid-cols-2 lg:grid-cols-3">
            {favouriteRockets.map((rocket) => (
              <RocketCard key={rocket.id} rocket={rocket} />
            ))}
          </div>
        )}
      </section>
      <section className="pt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-[-.03em]">
            YOUR COLLECTIONS
          </h2>
          <span className="text-[10px] font-semibold tracking-[.15em] text-white/45">
            {collections.length} TOTAL
          </span>
        </div>
        <div className="mt-7 space-y-5">
          {collections.length ? (
            collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                rockets={rockets}
              />
            ))
          ) : (
            <p className="border-t border-white/15 py-10 text-xs font-semibold tracking-[.14em] text-white/40">
              NO COLLECTIONS YET. CREATE ONE TO ORGANIZE YOUR FAVOURITE ROCKETS.
            </p>
          )}
        </div>
      </section>
      <CreateCollectionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreate={createCollection}
      />
    </div>
  );
}
