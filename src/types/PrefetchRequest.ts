export interface PrefetchRequest {
    seed: string;
    difficulty: string;
    mapIds: number[];
    verbose?: string;
    trim?: string;
    isometric?: string;
    edge?: string;
    wallthickness?: string;
    serverScale?: string;
    centerServerScale?: string;
    rotate?: string;
}