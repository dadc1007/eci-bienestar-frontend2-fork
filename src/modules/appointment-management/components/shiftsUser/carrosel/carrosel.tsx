import { hookCarrosel } from "../../../../appointment-management/hooks";
import { Slide } from "./slide";
import { Indicators } from "./indicators";
import type { CarroselProps } from "../../../../appointment-management/types/carroselType";

const Carrosel = ({ items }: CarroselProps) => {
  const { currentIndex, visible, current, fadeDuration } = hookCarrosel(items);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black">
      <Slide item={current} visible={visible} fadeDuration={fadeDuration} />

      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4">
        <h2 className="text-lg font-semibold text-left">{current.title}</h2>
        <Indicators total={items.length} currentIndex={currentIndex} />
      </div>
    </div>
  );
};

export default Carrosel;
