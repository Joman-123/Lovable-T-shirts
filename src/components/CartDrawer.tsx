import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartDrawer = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { 
    items, 
    updateQuantity, 
    removeItem,
    getTotalPrice,
    getTotalItems
  } = useCartStore();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative border-primary/30 hover:bg-primary/10 hover:border-primary">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-background animate-glow-pulse">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-card border-primary/20">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-primary">{t('cart.title')}</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? t('cart.empty') : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('cart.empty')}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 border border-primary/10 hover:border-primary/30 transition-all">
                      <div className="w-16 h-16 bg-background rounded-md overflow-hidden flex-shrink-0 border border-primary/20">
                        {item.product.image_url && (
                          <img
                            src={item.product.image_url}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-foreground">{item.product.title}</h4>
                        {item.variantInfo && (
                          <p className="text-sm text-muted-foreground">
                            {item.variantInfo}
                          </p>
                        )}
                        <p className="font-semibold text-primary">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 border-primary/30"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 border-primary/30"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-primary/20 bg-background/50 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{t('cart.total')}</span>
                  <span className="text-xl font-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] transition-all" 
                  size="lg"
                  disabled={items.length === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t('cart.checkout')}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
