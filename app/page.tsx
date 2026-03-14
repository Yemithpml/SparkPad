import SideBar from "@/components/SideBar";

export default function Dashboard() {
  return (
    <div className="flex">
      <SideBar />

      <div className="min-h-screen bg-gray-100 p-6 flex-1">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome back!
          </h1>
          <p className="text-gray-400">{"What's on your mind today"}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-3xl font-bold text-blue-500">1,250</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-3xl font-bold text-green-500">$8,420</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-3xl font-bold text-purple-500">420</p>
          </div>

        </div>

      </div>
    </div>
  );
}