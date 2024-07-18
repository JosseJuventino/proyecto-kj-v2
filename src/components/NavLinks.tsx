// src/components/NavLinks.tsx

import { linksLoggedIn, linksLoggedOut } from '@/constants/links';
import { LinksHeader, User } from '@/services/types';

interface NavLinksProps {
  user: User | null;
  modal: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ user, modal }) => {
  const renderLinks = () => {
    let isRenderTutor: LinksHeader[] = [...linksLoggedIn];

    if (user?.isTutor) {
      isRenderTutor.push({
        text: 'Tutorias',
        href: '/dashboard/projects/circulos-estudio/panel',
      });
    }

    if (user?.isAdmin) {
      isRenderTutor.push({
        text: 'Administrar',
        href: '/administrator/dashboard/inicio',
      });
    }

    const linksToRender: LinksHeader[] = user ? isRenderTutor : linksLoggedOut;
    return linksToRender.map((link) => (
      <a
        key={link.text}
        href={link.href}
        className={`mx-2 ${modal ? 'my-10 text-xl' : ''}`}
      >
        {link.text}
      </a>
    ));
  };

  return <>{renderLinks()}</>;
};

export default NavLinks;
