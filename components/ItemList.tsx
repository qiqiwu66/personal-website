import { ListItem } from "@/content"

export function ItemList({ items }: { items: ListItem[] }) {
  return (
    <ul className="space-y-7">
      {items.map((item, i) => {
        const inner = (
          <>
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-stone-900">{item.title}</span>
              {item.year && (
                <span className="text-caption text-stone-400 shrink-0">{item.year}</span>
              )}
            </div>
            {item.description && (
              <p className="text-body mt-0.5">
                {item.description}
              </p>
            )}
          </>
        )

        return (
          <li key={i}>
            {item.href ? (
              <a
                href={item.href}
                className="group block hover:opacity-70 transition-opacity"
              >
                {inner}
              </a>
            ) : (
              <div>{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
