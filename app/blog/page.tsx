import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
    title: "Bitácora Técnica | ~/ciervo",
    description: "Documentación de arquitecturas, resolución de problemas y sistemas.",
};

export default async function BlogPage() {
    const posts = getAllPosts();

    return (
        // Outer Wrapper: Esqueleto exacto de About
        <main className="w-full min-h-screen flex flex-col items-center px-4 sm:px-8 pt-24 pb-12">
            <div className="w-full max-w-5xl flex flex-col gap-10 md:gap-14">

                {/* Encabezado: Esqueleto exacto de About */}
                <header className="flex flex-col md:flex-row items-start gap-8 justify-between">
                    <div className="flex flex-col gap-4 max-w-2xl">

                        <Breadcrumb>
                            <BreadcrumbList className="font-mono text-sm">
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/">Home</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Bitácora</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-sans text-foreground">
                            Bitácora.
                        </h1>
                        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
                            // PENSAMIENTOS DE CIERVO
                        </p>
                    </div>
                </header>

                {/* Lista de Artículos */}
                <div className="flex flex-col">
                    {posts.length === 0 ? (
                        <div className="py-8 text-center font-mono text-sm text-muted-foreground">
                            No hay entradas publicadas aún.
                        </div>
                    ) : (
                        posts.map((post) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post.slug}
                                className="group flex flex-col sm:flex-row sm:items-baseline py-4 transition-all"
                            >
                                <h2 className="text-base sm:text-lg font-medium font-sans text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                    {post.title}
                                </h2>
                                <div className="hidden sm:block flex-1 border-b border-border/40 mx-4 group-hover:border-foreground/20 transition-colors duration-300" />
                                <time className="font-mono text-sm text-muted-foreground/60 shrink-0 group-hover:text-foreground/80 transition-colors duration-300 mt-1 sm:mt-0">
                                    {new Date(post.date).getFullYear()}
                                </time>
                            </Link>
                        ))
                    )}
                </div>

            </div>
        </main>
    );
}