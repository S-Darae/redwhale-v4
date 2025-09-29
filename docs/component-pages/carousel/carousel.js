import { Carousel } from "../../components/carousel/carousel.js";
import "./carousel.css";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach((carouselEl) => {
    new Carousel(carouselEl);
  });
});
