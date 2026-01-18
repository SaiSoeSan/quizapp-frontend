export interface QuickAction {
  href: string;
  label: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange" | "red" | "pink";
}

export interface RecentUser {
  name: string;
  email: string;
  role: string;
}

export interface ListCardItemData {
  id: string | number;
  title: string;
  subtitle: string | number;
  badgeText?: string;
  showBadge?: boolean;
  showAvatar?: boolean;
}
