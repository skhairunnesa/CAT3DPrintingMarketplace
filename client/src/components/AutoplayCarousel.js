/// <summary>
/// Authors: Isa Luluquisin
/// Description: Script contains the function for the infinitely scrolling carousel
/// </summary>

import React from "react";
import "../assets/carousel.css";
import { cardDetails } from "./CarouselCardDet";
import CarouselItem from "./CarouselItem";

function AutoplayCarousel() {
  return (
    <div className="carousel">
      <div className="carouselTrack">
        {Object.keys(cardDetails).map((detailKey) => {
          return (
            <CarouselItem
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
              carouselText={cardDetails[detailKey].carouselText}
              productLink={cardDetails[detailKey].productLink}
            ></CarouselItem>
          );
        })}
        {Object.keys(cardDetails).map((detailKey) => {
          return (
            <CarouselItem
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
              carouselText={cardDetails[detailKey].carouselText}
              productLink={cardDetails[detailKey].productLink}
            ></CarouselItem>
          );
        })}
        {Object.keys(cardDetails).map((detailKey) => {
          return (
            <CarouselItem
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
              carouselText={cardDetails[detailKey].carouselText}
              productLink={cardDetails[detailKey].productLink}
            ></CarouselItem>
          );
        })}
        {Object.keys(cardDetails).map((detailKey) => {
          return (
            <CarouselItem
              imgUrl={cardDetails[detailKey].imgUrl}
              imgTitle={cardDetails[detailKey].title}
              carouselText={cardDetails[detailKey].carouselText}
              productLink={cardDetails[detailKey].productLink}
            ></CarouselItem>
          );
        })}
      </div>
    </div>
  );
}

export default AutoplayCarousel;