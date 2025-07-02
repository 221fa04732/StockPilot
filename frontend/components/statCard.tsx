export default function StatCard({ icon, title, value, delta }: 
{ 
    icon: React.ReactNode, 
    title: string, 
    value: string | number, 
    delta: string 
}){
    return (<div className="bg-slate-800 rounded-lg p-6 flex flex-col hover:scale-105">
        <div className="flex justify-between items-start">
            <div className="bg-slate-700 p-3 rounded-lg">{icon}</div>
            {delta && (
                <span className={`text-xs px-2 py-1 rounded-full ${delta === 'Money' ? 'bg-green-900/30 text-green-400' : 'bg-blue-400/30 text-blue-300'}`}>
                    {delta}
                </span>
            )}
        </div>
        <h3 className="text-slate-400 mt-4 text-sm">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
    )
}