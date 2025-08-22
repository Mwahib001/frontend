import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: {
    singular: "Footer",
    plural: "Footers",
  },
  fields: [
    {
      name: "blocks",
      type: "blocks",
      required: true,
      blocks: [
        {
          slug: "logoAndSocialLink",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "socialLinksTitle",
              type: "text",
              required: true,
            },
            {
              name: "icons",
              type: "array",
              required: true,
              minRows: 1,
              maxRows: 5,
              fields: [
                {
                  name: "icon",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "link",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: "titleWithLinks",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "links",
              type: "array",
              required: true,
              minRows: 1,
              maxRows: 5,
              fields: [
                {
                  name: "linkText",
                  type: "text",
                  required: true,
                },
                {
                  name: "link",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: "appDownloadLinks",
          fields: [
            {
              name: "downloadLogosAndLinks",
              type: "array",
              fields: [
                {
                  name: "logo",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "link",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: "copyRightAndPrivacyStatement",
          fields: [
            {
              name: "privacyStatement",
              type: "textarea",
              required: true,
            },
            {
              name: "copyright",
              type: "textarea",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
