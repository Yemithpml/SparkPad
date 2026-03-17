"use client"

import Sidebar from "@/components/SideBar"
import ThoughtCard from "@/components/ThoughtCard"

export default function Favorites({ thoughts = [] }: any) {

  const favoriteThoughts = thoughts.filter((t: any) => t.favorite)

  return (
    <div className="flex">

      <Sidebar />

      <main
        className="
        flex-1 p-6 md:p-10 mt-14 md:mt-0 bg-gray-50 min-h-screen
        md:ml-64
        "
      >

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-900 font-bold">
            Favorite Thoughts ⭐
          </h1>

          <p className="text-gray-500 text-sm md:text-base">
            Your starred ideas and inspirations.
          </p>
        </div>

        {favoriteThoughts.length === 0 ? (
          <div className="text-gray-400 mt-10">
            You haven't added any favorites yet.
          </div>
        ) : (
          <div
            className="
            grid gap-6
            sm:grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
          "
          >
            {favoriteThoughts.map((t: any) => (
              <ThoughtCard
                key={t.id}
                {...t}
              />
            ))}
          </div>
        )}

      </main>

    </div>
  )
}
