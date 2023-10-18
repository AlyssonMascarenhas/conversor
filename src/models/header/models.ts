export interface HeaderProps {
  logo?: HeaderLogoProps;
}

export interface HeaderLogoProps {
  alt: string;
  src: string;
  action?: () => void;
}
