declare global {
  type RemoveSegment = {
    id: string;
  };

  type EditSegment = {
    id: string;
  };

  type UpdateSegment = {
    rule: SegmentRule;
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

  type ValidationResponse = PassValidationResponse | FailValidationResponse;

  type PassValidationResponse = {
    valid: true;
    template: Template;
  };

  type FailValidationResponse = {
    valid: false;
    errors: ErrorObject[];
  };

  type Template = {
    $schema: string;
    name: string;
    version: '0.0.1';
    elementSeparator: string;
    segmentSeparator: string;
    componentSeparator: string;
    repetitionSeparator: string;
    rules: SegmentRule[];
  };

  type Repetition = {
    property: string;
    filter?: string;
  };

  type Filter = {
    property: string;
    expression: string;
  };

  type SegmentRule = StandardSegmentRule | ContainerSegmentRule;

  type StandardSegmentRule = {
    name: string;
    container: false;
    trim?: boolean;
    numberOfRowsToSkip?: number;
    repetition?: Repetition;
    ignore?: string;
    filter?: Filter;
    elements: ElementRule[];
    children: SegmentRule[];
    closeRule?: CloseSegmentRule;
  };

  type ContainerSegmentRule = {
    name: string;
    container: true;
    numberOfRowsToSkip?: number;
    repetition?: Repetition;
    ignore?: string;
    filter?: Filter;
    children: SegmentRule[];
  };

  type CloseSegmentRule = Pick<
    StandardSegmentRule,
    'name' | 'elements' | 'trim'
  >;

  type ElementRule = {
    name: string;
    value: string;
    attributes?: ElementRuleAttribute;
  };

  type ElementRuleAttribute = {
    length?: LengthAttribute;
  };

  export type LengthAttribute = {
    min: number;
    max: number;
    padding?: string;
  };
}

export {};
