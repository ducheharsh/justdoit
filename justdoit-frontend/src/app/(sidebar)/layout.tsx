import LayoutProvider from "@/components/provider/layout-provider"

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (

        <LayoutProvider>
            {children}
        </LayoutProvider>

    )
}
