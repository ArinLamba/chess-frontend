import { Slider } from '@/components/ui/slider';

import { useBotDepth } from '@/store/use-depth';

export const BotDifficulty = () => {
  const { depth, setDepth } = useBotDepth();

  return (
    <div className='mt-6 lg:mt-0 w-[360px] lg:w-full flex flex-col mx-auto'>
      <Slider 
          value={[depth]}
          min={1}
          max={4}
          step={1}
          onValueChange={(val) => setDepth(val[0])}
          className=''
        />
        <div className="flex justify-between w-full text-xs font-semibold text-gray-700 py-3">
          <span className={depth === 1 ? 'text-lime-400' : ''}>   Easy</span>
          <span className={depth === 2 ? 'text-yellow-300' : ''}> Medium</span>
          <span className={depth === 3 ? 'text-orange-400' : ''}> Hard</span>
          <span className={depth === 4 ? 'text-red-700' : ''}>    Expert</span>
        </div>
    </div>
  );
};
