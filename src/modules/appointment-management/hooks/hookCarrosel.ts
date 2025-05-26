import { useEffect, useState } from "react";
import { CarroselItem } from "../types/carroselType";

const FADE_DURATION = 500;

export const hookCarrosel = (items: CarroselItem[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!items.length) return;

    const showMs = items[currentIndex].duration * 1000;

    const fadeOutTimer = setTimeout(() => setVisible(false), showMs);
    const changeTimer = setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % items.length);
      setVisible(true);
    }, showMs + FADE_DURATION);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(changeTimer);
    };
  }, [currentIndex, items]);

  return {
    currentIndex,
    visible,
    current: items[currentIndex],
    fadeDuration: FADE_DURATION,
  };
};

export default hookCarrosel;