type CarroselItem = {
  type: "image" | "video";
  title: string;
  duration: number;
  url: string;
};

type CarroselProps = {
  items: CarroselItem[];
};

export type { CarroselItem, CarroselProps };
