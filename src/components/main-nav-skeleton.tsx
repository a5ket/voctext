export default function MainNavSkeleton() {
  return (
    <div className="flex justify-end gap-3 min-h-[40px]">
      <div className="h-9 w-20 rounded-md bg-muted animate-pulse" />
      <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
    </div>
  )
}