import { Button } from "@/components/ui/button";
import { getCurrentDbUser } from "@/lib/user";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = auth();
  const dbUser = userId ? await getCurrentDbUser() : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to CodeArena
          </h1>
          
          {!userId ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Please sign in to access your profile
              </p>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Profile
              </h2>
              
              {dbUser ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    {dbUser.imageUrl && (
                      <img 
                        src={dbUser.imageUrl} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        {dbUser.firstName} {dbUser.lastName}
                      </p>
                      <p className="text-gray-600">{dbUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm text-gray-500">
                      Member since: {new Date(dbUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Loading user data...</p>
              )}
            </div>
          )}
          
          <div className="mt-8">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}