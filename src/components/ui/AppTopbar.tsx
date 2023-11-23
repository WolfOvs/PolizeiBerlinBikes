import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuLink } from 'src/App';

interface Props {
  appMenu: MenuLink[];
  userData: any;
}

const AppTopbar = (props: Props) => {
  const [expanded, setExpanded] = useState(false);
  const navlinks: MenuLink[] = props.appMenu;

  return (
    <header
      id="menu"
      aria-expanded={expanded}
      className="group absolute z-50 h-20 w-full overflow-hidden bg-gray-900/90 p-4 transition-[height] duration-300 aria-expanded:h-screen md:bg-transparent"
    >
      <div className="mx-auto w-full max-w-screen-xl gap-12 md:flex md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center">
              <span className="mx-2 text-2xl font-semibold text-white">
                Polizei Berlin
              </span>
            </div>
          </Link>
        </div>
        
      </div>
    </header>
  );
};

export default AppTopbar;
