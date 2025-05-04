import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function PromiseButtons() {
    return (
        <div className="flex gap-2 my-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white">TRUE PROMISES 0</Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">FALSE PROMISES 0</Button>
            <Button className="bg-blue-400 hover:bg-blue-500 text-white">UN-DECIDED 0</Button>
            <Button variant="outline" className="border-gray-300">
                <Plus className="h-4 w-4 mr-1" /> PROMISE
            </Button>
            <Button variant="outline" className="border-gray-300">
                HISTORY
            </Button>
        </div>
    )
}
