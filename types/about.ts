export interface AboutUnit {
    title: string;
    url: string;
    description?: string;
}

export interface AboutColumn {
    title: string;
    item: AboutUnit[];
}

export interface AboutGroup {
    title: string;
    item: AboutColumn[],
}