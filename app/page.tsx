"use server";

import HomePageClient from "@/components/ui/HomePageClient";

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    name: string;
    formats?: {
      medium?: {
        url: string;
      };
    };
  };
};

type Category = {
  id: number;
  name: string;
  items: Item[];
};

const baseUrl = "https://genuine-presence-df48c40f5e.strapiapp.com";

export default async function HomePage() {
  try {
    // Fetch deals banner
    const bannerRes = await fetch(`${baseUrl}/api/upload/files/68`, {
      cache: "no-store",
    });
    const bannerData = await bannerRes.json();
    const dealsBannerUrl = bannerData.url;

    // Fetch deals
    const dealsRes = await fetch(
      `${baseUrl}/api/catogaries?filters[name][$eq]=Deals&populate[items][populate]=image`,
      { cache: "no-store" }
    );
    const dealsData = await dealsRes.json();
    const deals = dealsData?.data[0]?.items || [];

    // Fetch all categories except "Deals", "Add ones", "banner"
    const categoriesRes = await fetch(
      `${baseUrl}/api/catogaries?populate[items][populate]=image&filters[name][$notIn]=Add%20Ones&filters[name][$notIn]=banner&filters[name][$notIn]=Deal`,
      { cache: "no-store" }
    );
    const categoriesData = await categoriesRes.json();
    const categories: Category[] = categoriesData.data || [];

    return (
      <HomePageClient
        categories={categories}
        deals={deals}
        dealsBannerUrl={dealsBannerUrl}
        baseUrl={baseUrl}
      />
    );
  } catch (err) {
    console.error("Failed to load data:", err);
    return <div className="text-white">Error loading page</div>;
  }
}
