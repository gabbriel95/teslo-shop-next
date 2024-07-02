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

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <swiper-container
        style={{
          width: "100vw",
          height: "500px",
        }}
        class="mySwiper"
        thumbs-swiper=".mySwiper2"
        pagination="true"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {images.map((image) => (
          <swiper-slide key={image}>
            <Image
              width={600}
              height={500}
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
