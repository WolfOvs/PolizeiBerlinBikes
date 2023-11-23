import { classNames } from 'primereact/utils';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
  menuMode: string;
  activeInlineProfile: boolean;
  onChangeActiveInlineMenu: () => void;
  userData: { name: string };
}

const AppInlineMenu = ({
  menuMode,
  activeInlineProfile,
  onChangeActiveInlineMenu,
  userData,
}: Props) => {
  const menuRef = useRef(null);

  const isSlim = () => {
    return menuMode === 'slim';
  };

  const isStatic = () => {
    return menuMode === 'static';
  };

  const isSidebar = () => {
    return menuMode === 'sidebar';
  };

  const isMobile = () => {
    return window.innerWidth <= 991;
  };

  return (
    <>
      {!isMobile() && (isStatic() || isSlim() || isSidebar()) && (
        <div
          className={classNames('layout-inline-menu', {
            'layout-inline-menu-active': activeInlineProfile,
          })}
        >
          <button
            className="p-link flex align-items-center mx-4 py-2 px-3 text-white bg-white-alpha-10 border-round-xl"
            onClick={onChangeActiveInlineMenu}
          >
            <img
              src="assets/layout/images/profile-image.png"
              alt="avatar"
              style={{ width: '44px', height: '44px' }}
            />
            <span className="font-semibold text-center mx-auto">
              {userData.name}
            </span>
            <i className="layout-inline-menu-icon pi pi-angle-down"></i>
          </button>
          <CSSTransition
            nodeRef={menuRef}
            classNames="p-toggleable-content"
            timeout={{ enter: 1000, exit: 450 }}
            in={activeInlineProfile}
            unmountOnExit
          >
            <ul ref={menuRef} className="layout-inline-menu-action-panel">
              <li className="layout-inline-menu-action-item">
                <button className="p-link">
                  <i className="pi pi-power-off pi-fw"></i>
                  <span>Logout</span>
                </button>
              </li>
              <li className="layout-inline-menu-action-item">
                <button className="p-link">
                  <i className="pi pi-cog pi-fw"></i>
                  <span>Settings</span>
                </button>
              </li>
              <li className="layout-inline-menu-action-item">
                <button className="p-link">
                  <i className="pi pi-user pi-fw"></i>
                  <span>Profile</span>
                </button>
              </li>
            </ul>
          </CSSTransition>
        </div>
      )}
    </>
  );
};

export default AppInlineMenu;
