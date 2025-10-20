import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CollectionCardProps {
  title: string;
  description: string;
  itemCount: number;
  category: string;
  link: string;
  imageUrl?: string;
  index?: number;
}

export const CollectionCard = ({
  title,
  description,
  itemCount,
  category,
  link,
  imageUrl,
  index = 0,
}: CollectionCardProps) => {
  return (
    <Link
      to={link}
      className="group block animate-fade-in-scale"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-card/50 border-2 border-primary/10 hover:border-primary/30 transition-all duration-500 hover-lift h-full">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">
                {title.charAt(0)}
              </div>
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-primary/90 backdrop-blur-sm">
            <span className="text-xs font-bold text-background uppercase tracking-wider">
              {category}
            </span>
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {itemCount} منتج متاح
            </p>
          </div>

          <p className="text-foreground/70 leading-relaxed">
            {description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
            <span>تصفح المجموعة</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        </div>
      </div>
    </Link>
  );
};
