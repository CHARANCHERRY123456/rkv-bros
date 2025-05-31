import GroupAvatar from "./GroupAvatar";

export default function GroupListItem({ group, onClick, active }) {
  return (
    <li
      className={`flex items-center gap-4 p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] cursor-pointer transition-all ${active ? "ring-2 ring-blue-500" : ""}`}
      onClick={onClick}
    >
      <GroupAvatar name={group.name} />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-blue-800 truncate">{group.name}</div>
        <div className="text-xs text-gray-500 truncate">{group.description || "No description"}</div>
      </div>
    </li>
  );
}
