import GroupListItem from "./GroupListItem";

export default function GroupSidebar({ groups, onGroupClick, onCreateClick }) {
  return (
    <div className="w-full sm:w-1/3 md:w-1/4 h-full bg-white border-r flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-2xl font-extrabold text-blue-700 tracking-tight">
          Groups
        </h2>
        <button
          onClick={onCreateClick}
          className="bg-blue-600 text-white rounded-full w-12 h-12 text-2xl shadow-xl hover:bg-blue-700 flex items-center justify-center transition"
          aria-label="Create group"
        >
          +
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {!Array.isArray(groups) || groups.length === 0 ? (
          <p className="text-center text-gray-400 mt-10 text-lg">
            No groups yet
          </p>
        ) : (
          <ul className="space-y-3">
            {groups.map((group) => (
              <GroupListItem
                key={group._id || group.id}
                group={group}
                onClick={() => onGroupClick(group._id || group.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
