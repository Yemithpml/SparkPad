import Link from "next/link";

function SideBar() {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between p-6">

      {/* Top Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">SparkPad</h2>
        <p className="text-sm text-gray-400 mt-1 mb-6">Your second brain</p>

        <nav>
          <ul className="space-y-4">

            <li>
              <Link href="/" className="text-gray-800 font-medium hover:text-purple-600">
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="/all-thoughts" className="text-gray-800 font-medium hover:text-purple-600">
                All Thoughts
              </Link>
            </li>

            <li>
              <Link href="/favorites" className="text-gray-800 font-medium hover:text-purple-600">
                Favorites
              </Link>
            </li>

            <li>
              <Link href="/tags" className="text-gray-800 font-medium hover:text-purple-600">
                Tags
              </Link>
            </li>

            <li>
              <Link href="/analytics" className="text-gray-800 font-medium hover:text-purple-600">
                Analytics
              </Link>
            </li>

          </ul>
        </nav>
      </div>

      {/* Footer Section */}
      <footer className="border-t border-gray-200 pt-4">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-900 mb-1">
            💡 Quick Tip
          </p>

          <p className="text-xs text-gray-600">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">
              ⌘
            </kbd>{" "}
            +{" "}
            <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">
              K
            </kbd>{" "}
            to quickly capture thoughts
          </p>
        </div>
      </footer>

    </aside>
  );
}

export default SideBar;