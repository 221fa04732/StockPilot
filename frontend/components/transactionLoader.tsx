export default function TransactionLoader() {
    if (typeof window !== 'undefined') {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (<div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white pt-32 pb-40">
        <div className="w-10/12 md:w-8/12">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-800/50 animate-pulse mb-2">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-slate-700"></div>
                        <div className="flex-1 space-y-3">
                            <div className="flex justify-between">
                                <div className="h-4 w-32 bg-slate-700 rounded"></div>
                                <div className="h-4 w-16 bg-slate-700 rounded"></div>
                            </div>
                            <div className="h-3 w-24 bg-slate-700 rounded"></div>
                            <div className="flex justify-between mt-2">
                                <div className="h-4 w-16 bg-slate-700 rounded"></div>
                                <div className="h-4 w-16 bg-slate-700 rounded"></div>
                                <div className="h-4 w-16 bg-slate-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)};