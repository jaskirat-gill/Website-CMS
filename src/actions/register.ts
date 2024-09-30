"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const { email, password, name } = values;

  try {
    if (!email || !password || !name) {
      return {
        error: "All fields are required",
      };
    }
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(",").map((email) => email.trim())
      : [];
    const role: "admin" | "user" = adminEmails.includes(email)
      ? "admin"
      : "user";
      const user = await User.create({
        email,
        password: hashedPassword,
        name,
        role, // Ensure role is set
      });
    const savedUser = await user.save();
  } catch (e) {
    console.log(e);
  }
};
