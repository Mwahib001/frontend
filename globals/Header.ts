import type { GlobalConfig } from 'payload';

export const Header: GlobalConfig = {
    slug: 'header',
    label: {
        singular: 'Header',
        plural: 'Headers',
    },
    fields: [
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'navigation',
            type: 'array',
            required: true,
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
        {
            name: 'icons',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'link',
                    type: 'text',
                    required: true,
                },
            ],
        }
    ],
}
