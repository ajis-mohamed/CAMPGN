import { Handshake, ClipboardList, Wallet, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

const statsData = [
  {
    id: 'collaborations',
    title: 'Active Collaborations',
    value: '4',
    badge: '2 In Flight',
    badgeType: 'blue',
    icon: Handshake,
    footnote: '2 awaiting submission, +1 this week',
    footnoteIcon: AlertCircle,
    footnoteIconColor: 'text-amber-500',
  },
  {
    id: 'applications',
    title: 'Applications',
    value: '7',
    badge: 'Active Pitch',
    badgeType: 'blue',
    icon: ClipboardList,
    footnote: '3 under review, 1 shortlisted',
    footnoteIcon: Clock,
    footnoteIconColor: 'text-blue-500',
  },
  {
    id: 'earnings',
    title: 'Total Earnings',
    value: '$8,450.00',
    badge: '+18.4%',
    badgeType: 'light-blue',
    icon: Wallet,
    footnote: '$1,850.00 in escrow pending sign-off',
  },
  {
    id: 'profile',
    title: 'Profile Match Score',
    value: '85%',
    progress: 85,
    rankText: 'Rank Tier 1',
    icon: ShieldCheck,
    footnote: 'Add TikTok media kit rate for 100%',
  },
];

export default function CreatorDashboardCard() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 bg-slate-50/50 @xl/dashboard:grid-cols-2 @5xl/dashboard:grid-cols-4">
      {statsData.map((stat) => {
        const IconComponent = stat.icon;
        const FootnoteIcon = stat.footnoteIcon;

        return (
          <div
            key={stat.id}
            className="flex min-h-40 flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-shadow duration-300 ease-in-out hover:shadow-md min-w-0"
          >
            {/* Header: Title and Icon Badge */}
            <div className="flex items-center justify-between gap-2 min-w-0">
              <span className="text-xs font-semibold text-slate-500 truncate">{stat.title}</span>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <IconComponent className="h-4 w-4" />
              </div>
            </div>

            {/* Main Content: Metric Value & Badges / Progress Bar */}
            <div className="mt-2.5 mb-3 min-w-0">
              <div className="flex items-baseline justify-between gap-1.5">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
                    {stat.value}
                  </span>

                  {stat.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap shrink-0 ${stat.badgeType === 'blue'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-blue-50 text-blue-600'
                        }`}
                    >
                      {stat.badge}
                    </span>
                  )}
                </div>

                {stat.rankText && (
                  <span className="text-xs font-medium text-amber-700 whitespace-nowrap shrink-0">
                    {stat.rankText}
                  </span>
                )}
              </div>

              {/* Progress bar for Profile Match Score */}
              {stat.progress !== undefined ? (
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-blue-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              ) : (
                /* Empty spacer ensuring consistent card height across all cards */
                <div className="mt-2.5 h-1.5 w-full" />
              )}
            </div>

            {/* Footnote / Supporting detail */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 min-w-0 pt-1 border-t border-slate-100/60">
              {FootnoteIcon && (
                <FootnoteIcon className={`h-3.5 w-3.5 shrink-0 ${stat.footnoteIconColor}`} />
              )}
              <span className="truncate min-w-0">{stat.footnote}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}