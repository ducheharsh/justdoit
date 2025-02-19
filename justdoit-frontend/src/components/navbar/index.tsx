"use client"

import * as React from "react"
import Image from "next/image"
import {
  BookOpen, Frame,
  LifeBuoy, Send,
  Settings2, Plus,
  LayoutDashboard
} from "lucide-react"

import { NavMain } from "@/components/navbar/ui/nav-main"
import { NavProjects } from "@/components/navbar/ui/nav-projects"
import { NavSecondary } from "@/components/navbar/ui/nav-secondary"
import { NavUser } from "@/components/navbar/ui/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "../ui/theme-toggle"


import toast from "react-hot-toast"
import { useDeleteProject, useProjectsWithCache } from "@/hooks/api/projects.action"
import { useUser } from "@/hooks/api/user.action"

const data = {

  navMain: [
    {
      title: "Add New",
      url: "#",
      icon: Plus,
      isActive: true,
    },

  ],
  navButtons: [{
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "FAQs",
    url: "/faqs",
    icon: BookOpen,

  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },

  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: projectsData, isLoading, refetch } = useProjectsWithCache()
  const deleteProject = useDeleteProject()
  const { data: user } = useUser()

  const projectsNavData = projectsData?.map((project) => ({
    id: project.id,
    name: project.name,
    url: "/projects/" + project.name.split(' ').join('-') + '?id=' + project.id,
    icon: Frame
  })) ?? []

  const handleDeleteProject = async (id: number) => {
    toast.promise(
      () => deleteProject.mutateAsync(id).then(() => {
        refetch()
      }),
      {
        loading: 'Deleting...',
        success: <b>Project deleted successfully! 🎉</b>,
        error: <b>Oops Something went wrong 😑</b>,
      }
    )
  }
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <ModeToggle />
                <Image
                  src='https://utfs.io/f/aMMSb4aTvgRAOMGAthZSt0yIuo6UmHKf8bV4N9lEriGhCXve'
                  alt='Logo'
                  width={150}
                  height={40}
                ></Image>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navButtons} />
        <NavProjects
          projects={projectsNavData}
          isLoading={isLoading}
          handleDeleteProject={handleDeleteProject}
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user?.username ?? "User",
          email: user?.email ?? "a",
          avatar: `https://ui-avatars.com/api/?name=${user?.username}`,
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}

