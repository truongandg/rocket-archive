import { useQuery } from "@tanstack/react-query";
import { getRocketLaunches } from "../services/launchLibrary";

export default function useRocketLaunches(id: number) {
  return useQuery({
    queryKey: ["rocket-launches", id],
    queryFn: () => getRocketLaunches(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
