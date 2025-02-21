interface FooterItem {
  icon?: string;
  text?: string;
  href: string;
}

interface FooterSection {
  title: string;
  items: FooterItem[];
}

const footerLinks: FooterSection[] = [
  {
    title: "Contact",
    items: [
      { icon: "fa fa-phone", text: "0731234567", href: "#" },
      { icon: "fa fa-envelope", text: "malmoe3@gmail.com", href: "#" },
    ],
  },
  {
    title: "About",
    items: [
      { text: "Home", href: "#" },
      { text: "About", href: "#" },
      { text: "Contact", href: "#" },
    ],
  },
  {
    title: "Social Media",
    items: [
      { icon: "fa-brands fa-github", href: "#" },
      { icon: "fa-brands fa-linkedin", href: "#" },
      { icon: "fa-brands fa-facebook", href: "#" },
    ],
  },
];

const FooterColumn = ({ title, items }: FooterSection) => (
  <div className="flex flex-col">
    <h2 className="bold">{title}</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <a href={item.href}>
            {item.icon && <i className={item.icon}></i>}
            {item.text && ` ${item.text}`}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="flex items-top justify-around">
        {footerLinks.map((column, index) => (
          <FooterColumn key={index} {...column} />
        ))}
      </div>
      <div className="flex flex-col items-center mt-4">
        <hr className="w-full border-t border-black mb-2" />
        <span className="bold">Detta är en hemsida © 2025</span>
      </div>
    </footer>
  );
}
