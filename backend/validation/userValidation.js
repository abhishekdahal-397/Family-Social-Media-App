const { z } = require("zod");

const registrationSchema = z
	.object({
		username: z
			.string()
			.min(1, "Username is required")
			.refine((value) => value.trim().split(" ").length === 2, {
				message: "Username must contain both firstname and lastname",
			}),
		email: z.string().email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string().min(1, "Confirm password is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"],
	});

module.exports = { registrationSchema };
