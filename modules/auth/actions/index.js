"use server"
import { getOrCreateDbUser } from "@/lib/user"

/**
 * Onboards a user by syncing their Clerk data with the local database
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export const onBoardUser = async () => {
  try {
    const user = await getOrCreateDbUser()
    
    if (!user) {
      return { error: "Failed to create or update user" }
    }

    return {
      success: true,
      user: user
    }
  } catch (error) {
    console.error("Error onboarding user:", error)
    return { error: "Failed to onboard user" }
  }
}
