import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileSearch, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="flex flex-col items-center text-center max-w-md">
                <div className="rounded-full bg-muted p-6 mb-6">
                    <FileSearch className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Page not found</h1>
                <p className="text-muted-foreground mb-8">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/dashboard">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full sm:w-auto">
                        <Link href="javascript:history.back()">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="mt-16 text-center">
                <p className="text-sm text-muted-foreground">
                    If you believe this is an error, please contact{" "}
                    <Link href="/support" className="text-primary hover:underline">
                        support
                    </Link>
                </p>
            </div>
        </div>
    )
}
