import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

/**
 * Gets the current user from the local database
 * @returns {Promise<Object|null>} The user object from the database or null if not found
 */
export async function getCurrentDbUser() {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return null;
    }
    
    const dbUser = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id
      }
    });
    
    return dbUser;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

/**
 * Gets or creates the current user in the local database
 * @returns {Promise<Object|null>} The user object from the database or null if not found
 */
export async function getOrCreateDbUser() {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return null;
    }
    
    // Check if user already exists
    let dbUser = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id
      }
    });
    
    // If user exists, update their information
    if (dbUser) {
      dbUser = await db.user.update({
        where: {
          clerkId: clerkUser.id
        },
        data: {
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          imageUrl: clerkUser.imageUrl,
          email: clerkUser.emailAddresses[0]?.emailAddress || ''
        }
      });
    } else {
      // If user doesn't exist, create them
      dbUser = await db.user.create({
        data: {
          clerkId: clerkUser.id,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          imageUrl: clerkUser.imageUrl,
          email: clerkUser.emailAddresses[0]?.emailAddress || ''
        }
      });
    }
    
    return dbUser;
  } catch (error) {
    console.error("Error getting or creating user:", error);
    return null;
  }
}