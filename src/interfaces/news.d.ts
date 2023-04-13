export interface INews {
    _News__id: string;
    _News__title: string;
    _News__content: string;
    _News__image_url: string;
    _News__created_at: string;
    _News__updated_at: string;
    _News__draft: boolean;
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