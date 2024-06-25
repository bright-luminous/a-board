export class CreatePostParams{
    title: string;
    content: string;
    owner: string;
    community: string;
}

export class UpdatePostParams{
    id: string
    title: string;
    content: string;
    community: string;
}