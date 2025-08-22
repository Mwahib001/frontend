import type { Block } from 'payload';

export const CategoryMenuBar: Block = {
    slug: 'category-menu-bar',
    labels: {
        singular: 'Category Menu Bar',
        plural: 'Category Menu Bars',
    },
    fields: [
        {
            name: 'items',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 10,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'link',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}