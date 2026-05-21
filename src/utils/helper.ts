export const getPlaceholder = (currentIndex: string) => {
  const levels = currentIndex
    .split('.')
    .filter((item) => !isNaN(Number(item)))
    .map(Number)
    .join('.');
  return levels || 'root';
};

const LEVEL_COLORS = [
  '#60a5fa', // blue
  '#34d399', // emerald
  '#fbbf24', // amber
  '#f472b6', // pink
  '#a78bfa', // violet
  '#22d3ee', // cyan
  '#fb7185', // rose
  '#facc15', // yellow
  '#4ade80', // green
  '#c084fc', // purple
];

export const getLevelColor = (level: number) => {
  return LEVEL_COLORS[level % LEVEL_COLORS.length];
};

export const calculateLevel = (nestIndex: string) => {
  if (!nestIndex) return 0;
  // nestIndex like "categories.0.categories.1" — depth = number of numeric segments
  return nestIndex.split('.').filter((p) => !isNaN(Number(p))).length;
};
