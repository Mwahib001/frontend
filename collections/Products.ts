import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
    slug: 'products',
    labels: {
        singular: 'Product',
        plural: 'Products',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            hasMany: false,
        },
        {
            name: 'buttonText',
            type: 'text',
            required: true,
            defaultValue: 'Add To Cart',
        },
    ],
}
