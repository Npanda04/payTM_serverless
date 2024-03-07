

import { Button } from "@/components/ui/button"
import { CardContent, Card } from "./ui/card"


export const FriendsComponent = () => {
    return (
        <>

            <Card className="p-6">
                <CardContent className="grid gap-4 max-w-3xl">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 max-w-3xl">
                            <div className="font-semibold">Alice Johnson</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">@alicejohnson</div>
                        </div>
                        <Button className="ml-auto" size="icon">
                            <ChevronRightIcon className="h-4 w-4" />
                            <span className="sr-only">Send money to Alice Johnson</span>
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 max-w-3xl">
                            <div className="font-semibold">Bob Smith</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">@bobsmith</div>
                        </div>
                        <Button className="ml-auto" size="icon">
                            <ChevronRightIcon className="h-4 w-4" />
                            <span className="sr-only">Send money to Bob Smith</span>
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 max-w-3xl">
                            <div className="font-semibold">Charlie Brown</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">@charliebrown</div>
                        </div>
                        <Button className="ml-auto" size="icon">
                            <ChevronRightIcon className="h-4 w-4" />
                            <span className="sr-only">Send money to Charlie Brown</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>





        </>
    )
}



function ChevronRightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}


