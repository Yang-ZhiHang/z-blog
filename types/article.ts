export type ArticleInfo = {
    id: number;
    title: string;
    description: string;
    content?: string;
    views: number;
    create_time: string;
    modified_time: string;
    cover_url_list: string[];
}