export interface Launch {
  id: string;
  name: string;
  status: { id: number; name: string } | null;
  net: string | null;
  launch_service_provider: { id: number; name: string } | null;
  pad: {
    id: number;
    name: string;
    location: { name: string } | null;
  } | null;
  mission: {
    name: string;
    description: string | null;
    type: string | null;
    vid_urls?: Array<{ url: string }> | null;
  } | null;
  image: { image_url: string | null } | null;
}
