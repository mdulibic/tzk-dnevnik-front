import { appConfig } from "@/config/app";
import { useTheme } from "@/hooks/useTheme";
import { Icons } from "@/components/icons";

export function Logo() {
    const { theme } = useTheme();

    // Determine which logo component to use based on the theme
    const LogoComponent = theme === 'system' || theme === 'dark' ? Icons.logoDark : Icons.logoLight;

    return (
        <div className="flex items-center">
            <LogoComponent className="h-10 w-10 mr-2" /> {/* Adjust size and margin as needed */}
            <span className="text-lg font-bold">{appConfig.appName}</span>
        </div>
    );
}
