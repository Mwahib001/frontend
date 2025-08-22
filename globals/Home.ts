import type { GlobalConfig } from "payload";

import { HeroCarousel } from "@/blocks/heroCarousel";
import { FullWidthBanner } from "@/blocks/fullWidthBanner";
import { DealsCarousel } from "@/blocks/dealsCarousel";
import { ProductGrid } from "@/blocks/productGrid";
import { CategoryMenuBar } from "@/blocks/categoryMenuBar";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Header",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "navigation",
              type: "array",
              required: true,
              fields: [
                {
                  name: "label",
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
            {
              name: "icons",
              type: "array",
              required: true,
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
          label: "bodyContent",
          fields: [
            {
              name: "heroCarousel",
              type: "blocks",
              required: true,
              blocks: [
                HeroCarousel,
                FullWidthBanner,
                DealsCarousel,
                ProductGrid,
                CategoryMenuBar,
              ],
            },
          ],
        },
        {
          label: "Footer",
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
        },
      ],
    },
  ],
};
