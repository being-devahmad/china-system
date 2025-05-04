// components/ProfileSection.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileSectionProps {
    name: string;
    email: string;
    avatarSrc: string;
}

const ProfileSection = ({ name, email, avatarSrc }: ProfileSectionProps) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Call your /auth/logout API here
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Redirect or handle successful logout
                router.push('/login'); // Redirect to login page
            } else {
                // Handle error (optional)
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-1.5">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarSrc} alt="User" />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">{name[0]}</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="ml-2 h-4 w-4 text-slate-500" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-slate-500">{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <span>My Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileSection;
