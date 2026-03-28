import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPostBySlug } from "@/lib/blog";
import { Calendar } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PostPageProps) {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);
    if (!post) return { title: "Post no encontrado | ~/ciervo" };

    return {
        title: `${post.title} | ~/ciervo`,
        description: post.summary,
    };
}

export default async function BlogPostPage({ params }: PostPageProps) {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        // Outer Wrapper: Esqueleto exacto de About
        <main className="w-full min-h-screen flex flex-col items-center px-4 sm:px-8 pt-24 pb-12">
            <article className="w-full max-w-5xl flex flex-col gap-10 md:gap-14">

                {/* Encabezado: Esqueleto exacto de About */}
                <header className="flex flex-col md:flex-row items-start gap-8 justify-between">
                    <div className="flex flex-col gap-4 max-w-5xl">

                        <Breadcrumb>
                            <BreadcrumbList className="font-mono text-sm">
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/">Home</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/blog">Bitácora</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="max-w-[150px] sm:max-w-[300px] truncate">
                                        {post.title}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-sans text-foreground">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm uppercase tracking-widest">
                            <Calendar className="size-4" />
                            <time>
                                {new Date(post.date).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                    </div>
                </header>

                {/* CONTENIDO DEL ARTÍCULO */}
                <div className="prose prose-neutral dark:prose-invert max-w-5xl font-sans prose-p:text-lg prose-p:leading-relaxed prose-p:text-neutral-800 dark:prose-p:text-neutral-300 prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-2 prose-a:text-blue-500 hover:prose-a:text-blue-400 prose-code:text-orange-500 dark:prose-code:text-orange-400 prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
                    <MDXRemote source={post.content} />
                </div>

            </article>
        </main>
    );
}