import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import useRockets from "../../hooks/useRockets";
import Button from "../ui/Button";
import RocketCard from "./RocketCard";

type Filter = "ALL" | "ACTIVE" | "REUSABLE";
type Sort = "name" | "launches";

const filters: Filter[] = ["ALL", "ACTIVE", "REUSABLE"];

export default function RocketExplorer() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("launches");
  const debouncedSearch = useDebouncedValue(search.trim(), 500);

  const queryOptions = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      active: filter === "ACTIVE" ? true : undefined,
      reusable: filter === "REUSABLE" ? true : undefined,
      ordering: sort === "name" ? "name" as const : "-total_launch_count" as const,
    }),
    [debouncedSearch, filter, sort],
  );

  const {
    data,
    isLoading: loading,
    isError: error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRockets(queryOptions);
  const rockets = useMemo(
    () => data?.pages.flatMap((page) => page.rockets) || [],
    [data],
  );

  return (
    <section className="mx-auto max-w-[1600px] px-8 py-12 lg:px-12 lg:py-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex h-12 min-w-0 flex-1 items-center gap-3 border border-white/25 px-4 text-white/60 focus-within:border-white">
          <Search size={17} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="SEARCH ROCKETS..."
            className="w-full bg-transparent text-xs font-medium tracking-[.14em] outline-none placeholder:text-white/35"
          />
        </label>
        <label className="relative flex h-12 shrink-0 items-center gap-3 border border-white/25 px-4 text-[11px] font-semibold tracking-[.14em] md:w-64">
          <SlidersHorizontal size={15} />
          <span className="text-white/45">ORDER</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
            className="w-full appearance-none bg-transparent pr-5 text-white outline-none"
          >
            <option value="name">NAME</option>
            <option value="launches">MOST LAUNCHES</option>
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-4 text-white/60" />
        </label>
      </div>
      <div className="mt-8 flex gap-6 overflow-x-auto border-b border-white/15">
        <div className="flex min-w-max gap-6">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              className={`border-b-2 pb-4 text-[10px] font-bold tracking-[.16em] ${filter === item ? "border-white text-white" : "border-transparent text-white/40 hover:text-white"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="ml-auto whitespace-nowrap text-[10px] font-semibold tracking-[.14em] text-white/45">
          {rockets.length} ROCKETS
        </span>
      </div>
      {loading && (
        <div className="grid grid-cols-1 gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse border border-white/10 bg-white/5"
            />
          ))}
        </div>
      )}
      {error && (
        <div className="py-28 text-center">
          <p className="text-xl font-semibold tracking-[-.03em]">
            UNABLE TO LOAD ROCKETS
          </p>
          <Button
            onClick={() => void refetch()}
            className="mt-6 border border-white px-5 py-3 text-[10px] font-bold tracking-[.16em] hover:bg-white hover:text-black"
          >
            TRY AGAIN
          </Button>
        </div>
      )}
      {!loading && !error && rockets.length === 0 && (
        <div className="py-28 text-center text-sm font-semibold tracking-[.2em] text-white/45">
          NO ROCKETS FOUND
        </div>
      )}
      {!loading && !error && rockets.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rockets.map((rocket) => (
              <RocketCard key={rocket.id} rocket={rocket} />
            ))}
          </div>
          {hasNextPage && (
            <div className="pt-10 text-center">
              <Button onClick={() => void fetchNextPage()} disabled={isFetchingNextPage} className="px-6 py-3 text-[10px] font-bold tracking-[.16em]">
                {isFetchingNextPage ? "LOADING ROCKETS..." : "LOAD MORE"}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
