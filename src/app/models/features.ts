//Features class
export class Features {
    feature: Feature;
    featureId: number;
    mappingId: number;
    user: any = null;
    userId: number;
    // isEvent: boolean = false;
    // isGoal: boolean = false;
    // isStock: boolean = false;
}

export class Feature{
    featureId: number;
    description: string;
    shortName: string;
}