import { NavItem } from "../types";
import HeartIcon from "../icons/HeartIcon";
import MessageIcon from "../icons/MessageIcon";

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 0,
    label: "Matches",
    icon: <MessageIcon />,
  },
  {
    id: 1,
    label: "Recommendation",
    icon: <HeartIcon />,
  },
];

export const MOBILE_BREAKPOINT = 768;
export const LOADING_DELAY = 2000;
export const LEFT_PANEL_WIDTH = "max-w-[25rem]";
