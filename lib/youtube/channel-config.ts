export const BADGE_COLORS = [
  "bg-red-500/15 text-red-300 border-red-500/30",
  "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "bg-violet-500/15 text-violet-300 border-violet-500/30",
  "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "bg-pink-500/15 text-pink-300 border-pink-500/30",
  "bg-purple-500/15 text-purple-300 border-purple-500/30",
  "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  "bg-orange-500/15 text-orange-300 border-orange-500/30",
  "bg-teal-500/15 text-teal-300 border-teal-500/30",
  "bg-sky-500/15 text-sky-300 border-sky-500/30",
  "bg-lime-500/15 text-lime-300 border-lime-500/30",
  "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
  "bg-rose-500/15 text-rose-300 border-rose-500/30",
  "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  "bg-green-500/15 text-green-300 border-green-500/30",
  "bg-slate-500/15 text-slate-300 border-slate-500/30",
  "bg-gray-500/15 text-gray-300 border-gray-500/30",
  "bg-neutral-500/15 text-neutral-300 border-neutral-500/30",
];

function getBadgeColor(index: number) {
  return BADGE_COLORS[index % BADGE_COLORS.length];
}

export type YoutubeChannelConfig = {
  id: string;
  label: string;
  badgeClassName?: string;
  uploadsPlaylistId?: string;
};

const CHANNELS_BASE = [
  { id: "UCOB62fKRT7b73X7tRxMuN2g", label: "지식한방" },
  { id: "UC7usMJDHmtbs_oegmzQKKMA", label: "경제사냥꾼" },
  { id: "UCC3yfxS5qC6PCwDzetUuEWg", label: "소수몽키" },
  { id: "UCdOjVxkj5JA0iDu3_xcsTyQ", label: "증시각도기TV" },
  { id: "UCWskYkV4c4S9D__rsfOl2JA", label: "한경 글로벌마켓" },
  { id: "UCQ-3tVPpV_4VdmeuJmLz9dQ", label: "미래에셋 투자와연금TV" },
  { id: "UCr7XsrSrvAn_WcU4kF99bbQ", label: "박곰희TV" },
  { id: "UCsJ6RuBiTVWRX156FVbeaGg", label: "슈카월드" },
  { id: "UCD9mxN8o9qLei1MbzroeP_A", label: "연금박사" },
  { id: "UC2QeHNJFfuQWB4cy3M-745g", label: "부읽남TV" },
];

export const YOUTUBE_CHANNELS: YoutubeChannelConfig[] = CHANNELS_BASE.map(
  (channel, index) => ({
    ...channel,
    badgeClassName: getBadgeColor(index),
  })
);