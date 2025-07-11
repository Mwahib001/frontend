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

export default async function HomePage() {
  try {
    // Fetch deals banner
    const dealsBannerUrl = process.env.NEXT_PUBLIC_DEALS_BANNER_URL;
    if (!dealsBannerUrl) throw new Error("DEALS_BANNER_URL is not set");
    const bannerRes = await fetch(dealsBannerUrl, { next: { revalidate: 600 } });
    const bannerData = await bannerRes.json();

    // Fetch deals
    const dealsRes = await fetch(
      `${baseUrl}/api/catogaries?filters[name][$eq]=Deals&populate[items][populate]=image`,
      { next: { revalidate: 600 } }
    );
    const dealsData = await dealsRes.json();
    const deals = dealsData?.data[0]?.items || [];

    // Fetch all categories except "Deals", "Add ones", "banner"
    const categoriesRes = await fetch(
      `${baseUrl}/api/catogaries?populate[items][populate]=image&filters[name][$notIn]=Add%20Ones&filters[name][$notIn]=banner&filters[name][$notIn]=Deal`,
      { next: { revalidate: 600 },}
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
