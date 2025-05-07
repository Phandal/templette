declare global {
  type RemoveSegment = {
    id: string;
  };

  type EditSegment = {
    id: string;
  };

  type DocumentOptions = {
    name: string;
    version: string;
    elementSeparator: string;
    segmentSeparator: string;
    componentSeparator: string;
    repetitionSeparator: string;
  };

  type Language = 'json' | '';

  type CreateEditorOptions = {
    language: Language;
    readonly: boolean;
    boilerPlate: boolean;
  };
}

export {};
