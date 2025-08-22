import type { Block } from 'payload';

export const ProductGrid: Block = {
    slug: 'product-grid',
    labels: {
        singular: 'Product Grid',
        plural: 'Product Grids',
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
