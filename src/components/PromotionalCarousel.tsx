import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface PromotionalBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  button_text: string | null;
}

export const PromotionalCarousel = () => {
  const { data: banners, isLoading } = useQuery({
    queryKey: ["active-promotional-banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promotional_banners")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as PromotionalBanner[];
    },
  });

  if (isLoading || !banners || banners.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={banner.id}>
                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
                  {/* Background Image with Parallax Effect */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${banner.image_url})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
                  
                  {/* Content */}
                  <div className="relative h-full flex items-center">
                    <div className="container px-8 md:px-16">
                      <div className="max-w-2xl space-y-6 animate-fade-in">
                        {/* Subtitle */}
                        {banner.subtitle && (
                          <p className="text-sm md:text-base font-bold uppercase tracking-wider text-primary animate-slide-in-right">
                            {banner.subtitle}
                          </p>
                        )}
                        
                        {/* Title */}
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight animate-slide-in-right"
                            style={{ animationDelay: '0.1s' }}>
                          {banner.title}
                        </h2>
                        
                        {/* CTA Button */}
                        {banner.link_url && banner.button_text && (
                          <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                            {banner.link_url.startsWith('/') ? (
                              <Link to={banner.link_url}>
                                <Button
                                  size="lg"
                                  className="bg-gradient-to-r from-primary to-secondary text-background font-bold text-lg px-8 py-6 hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all group/btn"
                                >
                                  {banner.button_text}
                                  <ChevronLeft className="mr-2 h-5 w-5 group-hover/btn:-translate-x-1 transition-transform" />
                                </Button>
                              </Link>
                            ) : (
                              <a href={banner.link_url} target="_blank" rel="noopener noreferrer">
                                <Button
                                  size="lg"
                                  className="bg-gradient-to-r from-primary to-secondary text-background font-bold text-lg px-8 py-6 hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all group/btn"
                                >
                                  {banner.button_text}
                                  <ChevronLeft className="mr-2 h-5 w-5 group-hover/btn:-translate-x-1 transition-transform" />
                                </Button>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows */}
          <CarouselPrevious className="left-4 h-12 w-12 bg-background/80 backdrop-blur-sm border-2 hover:bg-background hover:scale-110 transition-all" />
          <CarouselNext className="right-4 h-12 w-12 bg-background/80 backdrop-blur-sm border-2 hover:bg-background hover:scale-110 transition-all" />
        </Carousel>
      </div>
    </section>
  );
};
