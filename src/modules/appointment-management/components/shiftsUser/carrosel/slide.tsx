import type { CarroselItem } from "../../../../appointment-management/types/carroselType";

type Props = {
  item: CarroselItem;
  visible: boolean;
  fadeDuration: number;
};

export const Slide = ({ item, visible, fadeDuration }: Props) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-opacity`}
      style={{ transitionDuration: `${fadeDuration}ms`, opacity: visible ? 1 : 0 }}
    >
      {item.type === "image" ? (
        <img src={item.url} alt={item.title} className="w-full h-full object-contain" />
      ) : (
        <video
          src={item.url}
          autoPlay
          muted
          loop
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
};
