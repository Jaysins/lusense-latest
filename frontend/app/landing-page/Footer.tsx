import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Get the app",
      links: [
        { name: "iOS", href: "#" },
        { name: "Android", href: "#" },
      ],
    },
    {
      title: "Quick links",
      links: [
        { name: "Explore", href: "#explore" },
        { name: "Shop", href: "#shop" },
        { name: "Users", href: "#users" },
        { name: "Collections", href: "#collections" },
        { name: "Shopping", href: "#shopping" },
        { name: "Help Center", href: "#help" },
      ],
    },
    {
      title: "Policies",
      links: [
        { name: "Terms of service", href: "#terms" },
        { name: "Privacy policy", href: "#privacy" },
        { name: "Non-user notice", href: "#notice" },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-1 flex gap-x-3">
            <div className="w-8 h-8 bg-[#0504AA] rounded-full flex items-center justify-center text-white text-xs">
              LS
            </div>
            <Link href="/" className="md:text-3xl sm:text-2xl text-xl font-bold tracking-tighter">
              LuSense
            </Link>
          </div>

          {/* Dynamic Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-y-4">
              <h4 className="font-bold text-base">{section.title}</h4>
              <ul className="flex flex-col gap-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 text-sm text-gray-500">
          <p>© {currentYear} LuSense</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
