import {
  ClockIcon,
  UsersIcon,
  DollarIcon,
  CalendarIcon,
  LocationIcon,
} from "./Icons";

/**
 * The small info pills repeated on every card in the Figma.
 *
 *  StatChip       → white chip with a hairline + leading icon
 *  OrangeChip     → pale-orange pill ("عن بعد \ حضوري", "مدة العمل التقريبية")
 *  CategoryBadge  → pale-yellow badge with blue text ("الصحة")
 *  HackathonStats → the whole chip row, driven by one object so every card
 *                   renders it identically
 */

const ICONS = {
  clock: ClockIcon,
  users: UsersIcon,
  dollar: DollarIcon,
  calendar: CalendarIcon,
  location: LocationIcon,
};

export function StatChip({ icon, children, className = "" }) {
  const Icon = ICONS[icon];
  return (
    <span className={`stat-chip ${className}`}>
      {Icon && <Icon className="h-[15px] w-[15px] text-ink-soft" aria-hidden="true" />}
      {children}
    </span>
  );
}

export function OrangeChip({ children, className = "" }) {
  return <span className={`stat-chip-orange ${className}`}>{children}</span>;
}

export function CategoryBadge({ children, className = "" }) {
  return <span className={`category-badge ${className}`}>{children}</span>;
}

/**
 * Full stats row. Chips render right-to-left in the order listed below,
 * matching the Figma: date · location · prize · work duration · attendance.
 */
export function HackathonStats({
  duration,
  members,
  prize,
  date,
  location,
  workDuration,
  attendance,
  locationAsOrange = false,
  className = "",
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {duration && <StatChip icon="clock">{duration}</StatChip>}
      {members && <StatChip icon="users">{members}</StatChip>}
      {prize && (
        <StatChip icon="dollar">
          <span className="dir-ltr">{prize}</span>
        </StatChip>
      )}
      {date && <StatChip icon="calendar">{date}</StatChip>}
      {location &&
        (locationAsOrange ? (
          <OrangeChip>{location}</OrangeChip>
        ) : (
          <StatChip icon="location">{location}</StatChip>
        ))}
      {workDuration && <OrangeChip>{workDuration}</OrangeChip>}
      {attendance && <OrangeChip>{attendance}</OrangeChip>}
    </div>
  );
}
