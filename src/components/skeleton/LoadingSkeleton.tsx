export const LoadingSkeleton = () => (
  <div className="section-padding animate-pulse" aria-hidden="true">
    <div className="container-custom space-y-4">
      <div className="mx-auto h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
      <div className="mx-auto h-4 w-96 max-w-full rounded-lg bg-gray-100 dark:bg-gray-800/60" />
    </div>
  </div>
)
