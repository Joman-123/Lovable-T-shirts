import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Snowflake, Sparkles, Tag } from "lucide-react";

interface PromoCardProps {
  title: string;
  subtitle: string;
  discount?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  icon: "snowflake" | "sparkles" | "tag";
  variant: "primary" | "secondary" | "accent";
  index?: number;
}

export const PromoCard = ({
  title,
  subtitle,
  discount,
  description,
  buttonText,
  buttonLink,
  icon,
  variant,
  index = 0,
}: PromoCardProps) => {
  const icons = {
    snowflake: <Snowflake className="h-8 w-8" />,
    sparkles: <Sparkles className="h-8 w-8" />,
    tag: <Tag className="h-8 w-8" />,
  };

  const variants = {
    primary: "from-primary/20 via-primary/10 to-transparent border-primary/30 hover:border-primary/50",
    secondary: "from-secondary/20 via-secondary/10 to-transparent border-secondary/30 hover:border-secondary/50",
    accent: "from-accent/20 via-accent/10 to-transparent border-accent/30 hover:border-accent/50",
  };

  const textVariants = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br ${variants[variant]} backdrop-blur-sm transition-all duration-500 hover-lift animate-slide-up-fade group`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,193,7,0.1),transparent)]" />
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div className="relative p-8 space-y-6">
        {/* Icon */}
        <div className={`inline-flex p-4 rounded-full bg-gradient-to-br from-background/50 to-background/30 ${textVariants[variant]} animate-float`}>
          {icons[icon]}
        </div>

        {/* Title Section */}
        <div className="space-y-2">
          <p className={`text-sm font-bold uppercase tracking-wider ${textVariants[variant]}`}>
            {subtitle}
          </p>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {title}
          </h3>
          {discount && (
            <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r from-destructive/20 to-destructive/10 border border-destructive/30`}>
              <span className="text-2xl font-black text-destructive">{discount}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-foreground/70 text-lg leading-relaxed">
          {description}
        </p>

        {/* CTA Button */}
        <Link to={buttonLink}>
          <Button
            size="lg"
            className={`bg-gradient-to-r ${variant === "primary" ? "from-primary to-secondary" : "from-secondary to-accent"} text-background font-bold hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] transition-all group/btn w-full md:w-auto`}
          >
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Corner Decoration */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${variant === "primary" ? "from-primary/20" : "from-secondary/20"} to-transparent blur-2xl animate-pulse-glow`} />
      <div className={`absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-br ${variant === "primary" ? "from-secondary/20" : "from-accent/20"} to-transparent blur-2xl animate-pulse-glow`} />
    </div>
  );
};
