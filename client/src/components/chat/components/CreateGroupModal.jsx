import EmailAutoComplete from "../EmailAutoComplete";

export default function CreateGroupModal({
  show,
  onClose,
  onCreate,
  groupName,
  setGroupName,
  memberEmails,
  setMemberEmails,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h3 className="text-2xl font-bold mb-6 text-blue-700">
          Create New Group
        </h3>
        <form onSubmit={onCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <EmailAutoComplete
            value={memberEmails}
            onChange={setMemberEmails}
            excludeEmails={[]}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
