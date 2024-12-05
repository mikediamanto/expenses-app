'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  href: string;
  activeClass: string;
  children: React.ReactNode;
  className: string;
  [key: string]: unknown;
};

const NavLink = ({
  children,
  activeClass,
  href,
  className,
  ...props
}: Props) => {
  const pathname = usePathname();
  const activeClassText = pathname.startsWith(href) ? activeClass : '';

  return (
    <a {...props} href={href} className={`${className} ${activeClassText}`}>
      {children}
    </a>
  );
};

export default NavLink;
