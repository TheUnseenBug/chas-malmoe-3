import { Link } from "react-router-dom";

interface Artist {
    id: string;
    name: string;
    images: { url: string }[];
  }
  
  interface ArtistItemProps {
    artist: Artist;
  }

export default function ArtistItem({ artist }: ArtistItemProps) {
    return (
      <Link to={`/artist/${artist.id}`}>
      <li className="m-2 p-2 rounded-md border-4 border-black flex items-center gap-4 bg-colors-customPink">
        {artist.images.length > 0 && (
          <img src={artist.images[0].url} alt={artist.name} className="w-12 h-12 rounded-full" />
        )}
        <p className="font-semibold bg-colors-customPink">{artist.name}</p>
      </li>
      </Link>
    );
  }
  