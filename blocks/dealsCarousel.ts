import type  { Block } from 'payload';

export const DealsCarousel: Block = {
    slug: 'deals-carousel',
    labels: {
        singular: 'Deals Carousel',
        plural: 'Deals Carousels',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            required: true,
            hasMany: true,
        },
    ],
}
