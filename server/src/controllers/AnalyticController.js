import Student from "../models/Student.js";

export const getAnalyticsData = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments({ batch: "R20" });
        const genderStats = await Student.aggregate([
            { $group: { _id: "$gender", count: { $sum: 1 } } }
        ]);
        console.log(genderStats);
        const branchStats = await Student.aggregate([
            { $group: { _id: "$branch", count: { $sum: 1 } } }
        ]);
        const cgpaStats = await Student.aggregate([
            { $group: {
                _id: "$branch",
                avgCGPA: { $avg: "$cgpa" },
                maxCGPA: { $max: "$cgpa" },
                minCGPA: { $min: "$cgpa" }
            }}
        ]);
        const districtStats = await Student.aggregate([
            { $group: { _id: "$district", count: { $sum: 1 } } }
        ]);
        const casteStats = await Student.aggregate([
            { $group: { _id: "$caste", count: { $sum: 1 } } }
        ]);
        const bestStream = await Student.aggregate([
            { $group: { _id: "$stream", avgCGPA: { $avg: "$cgpa" } } },
            { $sort: { avgCGPA: -1 } },
            { $limit: 1 }
        ]);
        const avgCGPAByBranch = await Student.aggregate([
            { $group: { _id: "$branch", avgCGPA: { $avg: "$cgpa" } } }
        ]);

        res.json({
            totalStudents,
            genderStats,
            branchStats,
            cgpaStats,
            districtStats,
            casteStats,
            bestStream: bestStream[0] || null,
            avgCGPAByBranch,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching analytics", error });
    }
};
