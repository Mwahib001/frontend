import type { Block } from 'payload';

export const FullWidthBanner: Block = {
    slug: 'full-width-banner',
    labels: {
        singular: 'Full Width Banner',
        plural: 'Full Width Banners',
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
}
