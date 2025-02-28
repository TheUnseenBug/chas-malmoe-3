import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <main>
      <h3>Ops! Something went wrong. Try again later.</h3>
      <p>
        Go back to <NavLink to="/">homepage</NavLink>
      </p>
    </main>
  );
}
