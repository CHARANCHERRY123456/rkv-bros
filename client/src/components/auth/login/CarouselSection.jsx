import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import landing_page_images from "../../../data/images";

export default function CarouselSection() {
  return (
    <section className="mt-10 max-w-5xl mx-auto px-4">
      <Carousel showThumbs={false} infiniteLoop autoPlay interval={4000} showStatus={false} className="rounded-xl shadow-lg">
        {landing_page_images.map((img, idx) => (
          <div key={idx}>
            <img src={img.src} alt={`slide-${idx}`} className="rounded-xl max-h-[400px] object-cover" />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
