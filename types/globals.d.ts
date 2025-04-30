declare global {
  type RemoveSegment = {
    id: string;
  };

  type CreateSegment = {
    id: string;
    name: string;
  };

  type EditSegment = {
    id: string;
  };
}

export {};
