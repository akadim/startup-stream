import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import StartupCardSkeleton from "@/components/StartupCardSkeleton";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";

export const experimental_ppr = true;
export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="green_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <Suspense fallback={<StartupCardSkeleton />}>
          <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
              posts?.map((post: StartupTypeCard, index: number) => (
                <StartupCard post={post} key={index} />
              ))
            ) : (
              <p className="no-results">No startups found</p>
            )}
          </ul>
        </Suspense>
      </section>

      <SanityLive />
    </>
  );
}
