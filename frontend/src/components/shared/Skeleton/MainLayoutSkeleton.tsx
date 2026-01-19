export default function MainLayoutSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            {/* Public Header Skeleton */}
            <nav className="h-20 border-b border-slate-50 px-6 lg:px-20 flex items-center justify-between">
                <div className="h-8 w-32 bg-slate-100 rounded-lg animate-pulse" />
                <div className="hidden md:flex gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-4 w-16 bg-slate-100 rounded animate-pulse" />
                    ))}
                </div>
                <div className="h-10 w-28 bg-primary/10 rounded-full animate-pulse" />
            </nav>

            {/* Hero Section Skeleton */}
            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16 space-y-10">
                <div className="space-y-4 text-center max-w-2xl mx-auto">
                    <div className="h-12 w-full bg-slate-100 rounded-2xl animate-pulse mx-auto" />
                    <div className="h-6 w-3/4 bg-slate-50 rounded-xl animate-pulse mx-auto" />
                </div>

                {/* Content Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <div className="aspect-4/3 w-full bg-slate-100 rounded-3xl animate-pulse" />
                            <div className="h-5 w-3/4 bg-slate-100 rounded animate-pulse" />
                            <div className="h-4 w-1/2 bg-slate-50 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};