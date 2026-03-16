import { Star } from "lucide-react"

export default function ThoughtCard({ title, description, tag }: any) {
  return (
    <div className="bg-purple-50 border rounded-xl p-5 relative">

      <Star
        size={16}
        className="absolute top-4 right-4 text-yellow-500"
      />

      <span className="text-xs bg-white px-2 py-1 rounded">
        {tag}
      </span>

      <h3 className="font-semibold mt-3">
        {title}
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        {description}
      </p>

    </div>
  )
}

