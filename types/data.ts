export type RawData = {
  products: Product[];
  recommendations: Product[];
};

type OverviewProduct = Pick<Product, 'id' | 'title'>;
type OverviewThumbnail = Pick<Thumbnail, 'src'>;
type ProductOverview = OverviewProduct & OverviewThumbnail;

export type ParsedProducts = {
  products: ProductOverview[];
  recommendations: ProductOverview[];
};

type ProductDetail = Pick<Product, 'id' | 'title' | 'body' | 'price' | 'product_type'>;
type ProductDetailImage = Pick<Thumbnail, 'src' | 'alt'>;

export type ParsedProduct = ProductDetail & ProductDetailImage;

type Product = {
  id: number;
  title: string;
  body: string;
  vendor: Vendor;
  product_type: ProductType;
  price: number;
  tags: string;
  images: Thumbnail[];
  thumbnail: Thumbnail;
};

type Thumbnail = {
  id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  alt: null | string;
  width: number;
  height: number;
  src: string;
  variant_ids: any[];
};

export enum ProductType {
  HardGood = 'Hard Good',
  Tree = 'Tree',
}

enum Vendor {
  FastGrowingTrees = 'Fast Growing Trees',
}
