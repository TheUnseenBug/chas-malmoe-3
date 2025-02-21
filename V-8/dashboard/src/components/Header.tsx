function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-3 mb-5 bg-blue-500">
      <h1 className="flex object-left text-5xl">LOGO</h1>
      <nav className="flex start-right">
        <ul className="flex flex-row gap-8">
          <li>Home</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
