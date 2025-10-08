import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"
import { DialogTitle } from "@radix-ui/react-dialog"

export const MobileSidebar = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu className="text-white "/>
			</SheetTrigger>
			<SheetContent className="p-0 z-[100]" side="left">
				<DialogTitle />
				<Sidebar />
			</SheetContent>
		</Sheet>
	)
}


