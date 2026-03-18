import { Star, Calendar } from "lucide-react"

const tagStyles: Record<string, any> = {
  Idea: {
    card: "bg-blue-50 border-blue-200",
    tag: "bg-blue-100 text-blue-600"
  },
  Thought: {
    card: "bg-yellow-50 border-yellow-200",
    tag: "bg-yellow-100 text-yellow-600"
  },
  Personal: {
    card: "bg-pink-50 border-pink-200",
    tag: "bg-pink-100 text-pink-600"
  },
  Learning: {
    card: "bg-green-50 border-green-200",
    tag: "bg-green-100 text-green-600"
  },
  Business: {
    card: "bg-purple-50 border-purple-200",
    tag: "bg-purple-100 text-purple-600"
  },
    Random: {
    card: "bg-orange-50 border-orange-200",
    tag: "bg-orange-100 text-orange-600"
  }
}

export default function ThoughtCard({
  id,
  title,
  description,
  tag,
  date,
  favorite,
  toggleFavorite
}: any) {

  const style = tagStyles[tag] || tagStyles["Idea"]

  return (
    <div
      className={`
        relative rounded-2xl p-5 border
        ${style.card}
        hover:shadow-md transition
      `}
    >

      {/* Star */}
      <Star
        size={18}
        onClick={() => toggleFavorite(id)}
        className={`
          absolute top-4 right-4 cursor-pointer
          ${favorite ? "text-yellow-500 fill-yellow-400" : "text-gray-400"}
        `}
      />

      {/* Tag */}
      <span
        className={`
          text-xs px-3 py-1 rounded-full font-medium
          ${style.tag}
        `}
      >
        {tag}
      </span>

      {/* Title */}
      <h3 className="mt-3 font-semibold text-gray-900">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        {description}
      </p>

      {/* Date */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
        <Calendar size={14} />
        {date}
      </div>

    </div>
  )
}
