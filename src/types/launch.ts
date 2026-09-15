/** A normalized Launch Library 2 launch, used for a rocket's history. */
export interface RocketLaunch {
  id: string;
  name: string;
  status: { id: number; name: string } | null;
  net: string | null;
  launchServiceProvider: { id: number; name: string } | null;
  pad: {
    id: number;
    name: string;
    location: { name: string } | null;
  } | null;
  mission: {
    name: string;
    description: string | null;
    type: string | null;
  } | null;
  image: string | null;
}
