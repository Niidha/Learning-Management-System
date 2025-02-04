import { AnnouncementCollection } from "../model/announcement.model.mjs";
import { CourseCollection } from "../model/courselist.model.mjs";
import { studentCollection } from "../model/user.model.mjs";

export const getUsers = async (req, res) => {
    try {
        const users = await studentCollection.find();
        return res.status(200).send({ message: "Users fetched", users });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Internal server error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await studentCollection.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};
// export const updateUser = async (req, res) => {
//     try {
//         const updatedUser = await studentCollection.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedUser) return res.status(404).json({ message: "User not found" });
//         res.status(200).json({ message: "User updated successfully", updatedUser });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating user", error });
//     }
// };


export const deleteUser = async (req, res) => {
    try {
        const user = await studentCollection.findByIdAndUpdate(
            req.params.id,
            { status: 'disabled' },  // Update the status to 'disabled'
            { new: true }  // Return the updated user
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User disabled successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error disabling user", error });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const course = await CourseCollection.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Error fetching course", error });
    }
};
export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await AnnouncementCollection.find().sort({ createdAt: -1 });
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: "Error fetching announcements", error });
    }
};

export const createAnnouncement = async (req, res) => {
    try {
        const newAnnouncement = new AnnouncementCollection(req.body);
        await newAnnouncement.save();
        res.status(201).json({ message: "Announcement created successfully", newAnnouncement });
    } catch (error) {
        res.status(500).json({ message: "Error creating announcement", error });
    }
};




export const deleteAnnouncement = async (req, res) => {
    try {
        await AnnouncementCollection.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting announcement", error });
    }
};