export const getPlaceholder = (currentIndex: string) => {
  const levels = currentIndex
    .split('.')
    .filter((item) => !isNaN(Number(item)))
    .map(Number)
    .join('.');
  return levels;
};

export const getBackgroundColor = (level: number) => {
  const colors = [
    'bg-red-900',
    'bg-green-900',
    'bg-blue-900',
    'bg-yellow-900',
    'bg-purple-900',
    'bg-pink-900',
    'bg-indigo-900',
    'bg-teal-900',
    'bg-cyan-900',
    'bg-lime-900',
    'bg-amber-900',
    'bg-orange-900',
    'bg-gray-900',
  ];
  return colors[level % colors.length];
};

export const calculateLevel = (nestIndex: string) => {
  return nestIndex ? nestIndex.split('.').length : 0;
};
