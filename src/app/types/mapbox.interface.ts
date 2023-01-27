export interface MapboxLayer {
  id: string;
  type:
    | 'symbol'
    | 'fill'
    | 'background'
    | 'circle'
    | 'fill-extrusion'
    | 'heatmap'
    | 'hillshade'
    | 'line'
    | 'raster'
    | 'custom'
    | 'sky';
  source: string;
  layout: any;
  paint: any;
  filter?: any[]
  before?: string;
  sourceLayer?: string;
}
