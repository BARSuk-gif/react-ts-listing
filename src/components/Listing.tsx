export interface ListingItem {
  listing_id: number;
  url: string;
  MainImage?: { url_570xN: string };
  title: string;
  currency_code: string;
  price: string;
  quantity: number;
  state?: string;
  is_digital?: boolean;
}

interface ListingProps {
  items?: ListingItem[];
}

export default function Listing({ items = [] }: ListingProps) {

  type VisibleItem = ListingItem & { MainImage: { url_570xN: string } };

  const isVisible = (i: ListingItem): i is VisibleItem =>
  !!i.MainImage && i.state === 'active';

  const visibleItems: VisibleItem[] = items.filter(isVisible);

  const getCurrencySymbol = (code: string): string => {
    switch (code) {
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
      case 'CAD': return ' CAD ';
      default: return code;
    }
  };

  const getStockLevel = (quantity: number): string => {
    if (quantity <= 4) return 'low';
    if (quantity < 20) return 'medium';
    return 'high';
  };

  const formatTitle = (title: string, max = 100): string =>
    title.length > max ? `${title.slice(0, max)}...` : title;

  return (
    <div className="product-grid">
      {visibleItems.map((item) => (
        <div className="product-card" key={item.listing_id}>
          {item.is_digital && <span className="digital-badge">Digital</span>}
          <a href={item.url} target="_blank" rel="noreferrer">
            <img
              src={item.MainImage.url_570xN}
              alt={item.title}
              className="product-image"
            />
          </a>
          <div className="product-info">
            <h3 className="product-title">
              <a href={item.url} target="_blank" rel="noreferrer">
                {formatTitle(item.title)}
              </a>
            </h3>
            <div className="price-container">
              <div className="product-price">
                {`${getCurrencySymbol(item.currency_code)}${item.price}`}
              </div>
              <span className={`stock-badge stock-${getStockLevel(item.quantity)}`}>
                {item.quantity} left
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}