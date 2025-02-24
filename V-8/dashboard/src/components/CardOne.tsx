import blueDog from "../assets/blue-dog.jpg";
import Button from "./Button";

export default function CardOne() {
  return (
    <div className="rounded-sm border-2 border-black h-100 w-80 m-2 p-2 content-center bg-gray-500">
      <section className=" flex flex-row">
        <img
          src={blueDog}
          alt="a puppy looking over it's shoulder"
          className="h-50 w-40 rounded-sm border-2 border-black m-1"
        />
        <h2 className="font-semibold text-5xl ">The Sweet Little Dog</h2>
      </section>
      <section className="flex flex-col">
        <p className="p-1">
          Some text about the sweet little dog. This little dog is so sweet.
          This little dog is so little. Look at this sweet little dog!
        </p>
        <Button text="Jag är en knapp" />
      </section>
    </div>
  );
}
