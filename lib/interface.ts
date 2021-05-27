export interface GetPostResult {
    id: number;
    slug: string;
    title: string;
    created_at: string;
}

export interface PostDataResult extends GetPostResult {
    markdown_content: string;
    created_at: string;
}