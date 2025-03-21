interface FooterItem {
  icon?: string;
  text?: string;
  href: string;
  className?: string;
}

interface FooterSection {
  title: string;
  items: FooterItem[];
}

const footerLinks: FooterSection[] = [
  {
    title: "Contact",
    items: [
      {
        icon: "fa fa-phone",
        text: "0731234567",
        href: "#",
      },
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

const FooterColumn = ({ title, items }: FooterSection) => {
  if (title === "Social Media") {
    return (
      <div>
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <div className="flex justify-center gap-4">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="hover:text-white transition-colors"
            >
              <i className={`${item.icon} text-2xl`}></i>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-center">
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="hover:text-white transition-colors">
              {item.icon && <i className={item.icon}></i>}
              {item.text && ` ${item.text}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#9F9A9A] py-4">
      <div className="flex items-top justify-around">
        {footerLinks.map((column, index) => (
          <FooterColumn key={index} {...column} />
        ))}
      </div>
      <div className="flex flex-col items-center mt-4 pb-0">
        <hr className="w-full border-t border-black mb-2" />
        <span className="bold mb-0">Detta är en hemsida © 2025</span>
      </div>
    </footer>
  );
}
