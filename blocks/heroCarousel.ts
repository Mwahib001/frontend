import type { Block } from 'payload';

export const HeroCarousel: Block = {
    slug: 'hero-carousel',
    labels: {
        singular: 'Hero Carousel',
        plural: 'Hero Carousels',
    },
    fields: [
        {
            name: 'carouselImages',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 5,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}