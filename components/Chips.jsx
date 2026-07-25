import {
  ClockIcon,
  UsersIcon,
  DollarIcon,
  CalendarIcon,
  LocationIcon,
} from "./Icons";

/**
 * Chip set — the small info pills repeated on every card in the design:
 *
 *  - StatChip       → white bordered chip with icon (٢ يوم، ١-٤ أعضاء، ٣٠٠٠$…)
 *  - OrangeChip     → pale-orange pill ("عن بعد \ حضوري"، "مدة العمل التقريبية")
 *  - CategoryBadge  → pale-orange badge with blue text ("الصحة"، "الذكاء الاصطناعي")
 *  - HackathonStats → the full chip row used on hackathon/team cards, driven
 *                     by a single data object so every card renders the row
 *                     identically.
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
      {Icon && <Icon className="h-4 w-4 text-ink-soft" aria-hidden="true" />}
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
 * Full stats row for a hackathon.
 *
 * @param {object} props
 * @param {string} [props.duration]  e.g. "2 يوم"
 * @param {string} [props.members]   e.g. "1-4 أعضاء"
 * @param {string} [props.prize]     e.g. "3000"
 * @param {string} [props.date]      e.g. "19 يوليو"
 * @param {string} [props.location]  e.g. "عن بعد" — rendered as OrangeChip
 *                                   when `locationAsOrange` is true (matching
 *                                   page style), StatChip otherwise
 *                                   (hackathons page style).
 * @param {string} [props.workDuration] e.g. "مدة العمل التقريبية : أسبوعين"
 * @param {boolean} [props.locationAsOrange]
 */
export function HackathonStats({
  duration,
  members,
  prize,
  date,
  location,
  workDuration,
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
      {workDuration && <OrangeChip>{workDuration}</OrangeChip>}
      {location &&
        (locationAsOrange ? (
          <OrangeChip>{location}</OrangeChip>
        ) : (
          <StatChip icon="location">{location}</StatChip>
        ))}
    </div>
  );
}