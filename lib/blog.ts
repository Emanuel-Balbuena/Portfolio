// Archivo: lib/blog.ts
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// Definimos la estructura estricta de nuestros metadatos
export type BlogPost = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    content: string;
};

// Ruta absoluta a la carpeta donde vivirán los markdowns
const blogDirectory = path.join(process.cwd(), "content/blog");

// Función para obtener todos los posts (Ideal para la página /blog)
export function getAllPosts(locale: string = "es"): BlogPost[] {
    // Verificamos si la carpeta existe, si no, devolvemos un array vacío
    if (!fs.existsSync(blogDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(blogDirectory);

    const posts = fileNames
        .filter((fileName) => fileName.endsWith(`.${locale}.md`) || fileName.endsWith(`.${locale}.mdx`))
        .map((fileName) => {
            // El 'slug' es el nombre del archivo sin la extensión de idioma y formato (ej. 'terminal-simulada')
            const slug = fileName.replace(new RegExp(`\\.${locale}\\.mdx?$`), "");
            const fullPath = path.join(blogDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");

            // gray-matter separa los metadatos (data) del contenido (content)
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title,
                date: data.date,
                summary: data.summary,
                content,
            };
        });

    // Ordenamos los posts por fecha (del más reciente al más antiguo)
    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Función para obtener un solo post por su slug (Para la ruta dinámica /blog/[slug])
export function getPostBySlug(slug: string, locale: string = "es"): BlogPost | null {
    try {
        const fullPath = path.join(blogDirectory, `${slug}.${locale}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date,
            summary: data.summary,
            content,
        };
    } catch (error) {
        return null; // Si el archivo no existe, devolvemos null para manejar el 404
    }
}