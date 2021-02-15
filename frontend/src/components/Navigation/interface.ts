export type NavigationWrapper<P> = React.FC<P> & {
  List: React.FC<NavigationListInterface>;
  Item: React.FC<NavigationItemInterface>;
};

/**
 * NavigationInterface.
 * @interface NavigationInterface
 * @member {string} to path
 * @member {string} logo the logo to be displayed
 * @member {React.ReactNode} toggler icon for the menu toggler button
 * @member {string} className additional classes
 */
export interface NavigationInterface {
  id?: string;
  logo?: string;
  toggler?: React.ReactNode;
  className?: string;
}

/**
 * NavigationListInterface
 * @interface NavigationListInterface
 * @member {string} align defines the alignment of the list
 * @member {string} className additional classes
 */
export interface NavigationListInterface {
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * NavigationItemInterface
 * @interface NavigationItemInterface
 * @member {string} to path
 * @member {React.ReactNode} icon icon to be displayed along with the nav item
 * @member {string} className additional classes
 * @member {function} onClick on click action
 */
export interface NavigationItemInterface {
  to: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
