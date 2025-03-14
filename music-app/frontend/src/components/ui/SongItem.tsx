interface Song {
  id: string;
  name: string;
  images: { url: string }[];
}

interface SongItemProps {
  song: Song;
}

export default function SongItem({ song }: SongItemProps) {
  return (
    <li className="m-2 p-2 rounded-md border-4 border-black flex items-center gap-4 bg-colors-customPink">
      {song.images.length > 0 && (
        <img
          src={song.images[0].url}
          alt={song.name}
          className="w-12 h-12 rounded-full"
        />
      )}
      <p className="font-semibold bg-colors-customPink">{song.name}</p>
    </li>
  );
}
