"use client";

import { register } from "swiper/element/bundle";
import { Autoplay } from "swiper/modules";

import "./slideshow.css";
import Image from "next/image";
register();

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <swiper-container
        class="mySwiper"
        thumbs-swiper=".mySwiper2"
        space-between="10"
        navigation="true"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {images.map((image) => (
          <swiper-slide key={image}>
            <Image
              width={1024}
              height={800}
              src={`/products/${image}`}
              alt={title}
              className="rounded-lg object-fill"
            />
          </swiper-slide>
        ))}
      </swiper-container>

      <swiper-container
        class="mySwiper2"
        space-between="10"
        slides-per-view="4"
        free-mode="true"
        watch-slides-progress="true"
      >
        {images.map((image) => (
          <swiper-slide key={image}>
            <Image
              width={300}
              height={300}
              src={`/products/${image}`}
              alt={title}
              className="rounded-lg object-fill"
            />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};
