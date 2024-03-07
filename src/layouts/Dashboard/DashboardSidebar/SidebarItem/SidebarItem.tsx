import classNames from "classnames";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHover } from "src/hooks";
import { Router } from "src/types";
import "./SidebarItem.scss";

interface SidebarItemProps {
  className?: string;
  sidebarItem: Router;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  className,
  sidebarItem,
}) => {
  const { title, href, icon, children } = sidebarItem;
  const [show, setShow] = useState<boolean>(false);
  const { pathname } = useLocation();

  const { nodeRef: hoverRef, show: showHover } = useHover();

  const renderChildrenNav = (navs: Router[]) => {
    return (
      navs.length > 0 &&
      navs.map((nav, index) => {
        const { title, href, icon } = nav;
        return (
          <Link
            key={index}
            className={classNames("sidebar-item-title", {
              active: href === pathname,
            })}
            to={href as string}
          >
            {icon && (
              <></>
            )}
            <span className="sidebar-children-title">{title}</span>
          </Link>
        );
      })
    );
  };

  if (!children?.length) {
    return (
      <Link
        ref={hoverRef}
        className={classNames(className, "sidebar-item-title", {
          active: href === pathname,
        })}
        to={href as string}
      >
        {icon && (
          <></>
        )}
        <span className="sidebar-title">{title}</span>
      </Link>
    );
  }

  return (
    <React.Fragment>
      <div
        className={classNames(className, "nav-list", {
          active: href === pathname,
        })}
        ref={hoverRef}
        onClick={() => setShow(!show)}
      >
        <div className="nav-list-item">
          {icon && (
           <></>
          )}
          <span>{title}</span>
          
        </div>
      </div>
      {show && (
        <div className="nav-child-list">{renderChildrenNav(children)}</div>
      )}
    </React.Fragment>
  );
};

export default SidebarItem;
