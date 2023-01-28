import { Injectable } from "@angular/core"

export interface MapboxMapStyles {
    circle: {
        layout?: any
        paint?: any
    },
    line: {
        layout?: any
        paint?: any
    },
    polygon: {
        layout?: any
        paint?: any
    }
    symbol: {
        layout?: any
        paint?: any
    }
}

@Injectable()
export class MapboxLayersService {
    style: MapboxMapStyles = {
        circle: {
            layout: { visibility: 'visible'},
            paint: {
                'circle-color': '#fff',
                'circle-radius': 5,
            }
        },
        line: {
            layout: {
                visibility: 'visible',
            },
            paint: {
            'line-color': "#f00",
            'line-width': 3,
            }
        },
        polygon: {
            layout: {
                visibility: 'visible',
              },
              paint: {
                'line-color': '#f2f',
                'line-width': 2,
              },
        },
        symbol: {
            layout: {},
            paint: {}
        }
    }

}