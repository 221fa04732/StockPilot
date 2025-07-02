export default function PaginationBtn({onClick, enable, name} : {onClick :()=>void, enable : boolean, name: string}){
    return(<button
        onClick={onClick}
        disabled={!enable}
        className={`px-4 py-2 rounded-md text-sm ${enable ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>{name}
    </button>)
}