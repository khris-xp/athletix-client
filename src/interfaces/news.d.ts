export interface INews {
    id: string;
    title: string;
    content: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    draft: boolean;
}

export interface ICreateNew {
    title: string;
    content: string;
    image_url: string;
    draft: boolean
}

export interface IUpdateNew {
    news_id?: string;
    title: string;
    content: string;
    image_url: string;
    draft?: boolean
}