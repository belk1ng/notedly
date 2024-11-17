declare global {
  type BuckPick<Target, Keys extends string & keyof Target> = {
    [Key in Keys as `$${Key}`]: Target[Key];
  };

  type Nullable<Type> = Type | null;
}

export {};
