"use client"
import {
  Folder,
  MoreHorizontal,
  PlusCircle,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import TaskLoader from "../../ui/task-loader"
import { CreateProject } from "../../popups/create-project"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface Project {
  id: number
  name: string
  url: string
  icon: LucideIcon
}

interface NavProjectsProps {
  projects: Project[]
  isLoading: boolean
  handleDeleteProject: (id: number) => void
}

export function NavProjects({
  projects,
  isLoading,
  handleDeleteProject,
}: NavProjectsProps) {
  const { isMobile } = useSidebar()

  // Only show loader if we're loading and have no projects
  const showLoader = isLoading && projects.length === 0
  const showEmptyState = !isLoading && projects.length === 0
  const router = useRouter()


  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.id} className="hover:cursor-pointer">
            <SidebarMenuButton asChild>
              <a onClick={() => router.push(item.url)}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const url = window.location.href
                    navigator.clipboard.writeText(url)
                    toast.success("Link copied to clipboard")
                  }}
                >
                  <Share className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDeleteProject(item.id)} className="text-red-500">
                  <Trash2 />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))
        }

        {showLoader && (
          <SidebarMenuItem className="ml-2 mt-2">
            <TaskLoader />
          </SidebarMenuItem>
        )}

        {showEmptyState && (
          <SidebarMenuItem>
            <CreateProject>
              <div className="flex w-full justify-between items-center hover:text-white hover:text-primary cursor-pointer px-2 py-1">
                <span className="text-muted-foreground text-sm">No projects found</span>
                <PlusCircle className="text-muted-foreground h-4 w-4" />
              </div>
            </CreateProject>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}