export default function DashboardLoader(){
    if (typeof window !== 'undefined') {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (<div className="w-full flex flex-col justify-center items-center min-h-screen bg-slate-950 text-white pt-12">
            <div className="w-10/12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {Array(6).fill(0).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-900 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-5 w-5 bg-slate-700 rounded-full animate-pulse" />
                            <div className="h-5 w-1/3 bg-slate-700 rounded animate-pulse" />
                        </div>
                        <div className="divide-y divide-slate-800">
                            {Array(4).fill(0).map((_, i) => (
                                <SkeletonListItem key={i} />
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-5 w-5 bg-slate-700 rounded-full animate-pulse" />
                            <div className="h-5 w-1/3 bg-slate-700 rounded animate-pulse" />
                        </div>
                        <div className="divide-y divide-slate-800">
                            {Array(5).fill(0).map((_, i) => (
                                <SkeletonListItem key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SkeletonCard() {
    return (
        <div className="animate-pulse bg-slate-800 rounded-xl p-4 space-y-4">
            <div className="h-4 w-1/3 bg-slate-700 rounded" />
            <div className="h-6 w-1/2 bg-slate-700 rounded" />
        </div>
    )
}

function SkeletonListItem() {
    return (
        <div className="animate-pulse py-4 space-y-2">
            <div className="h-4 w-1/3 bg-slate-700 rounded" />
            <div className="h-4 w-2/3 bg-slate-700 rounded" />
        </div>
    )
}
