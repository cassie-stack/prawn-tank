import {
  assertIntOptional,
  assertIntPositiveOptional,
  assertStringOptional,
} from "../Common/validation";

export default class TagRequest {
  static schema: object = {
    type: "object",
    properties: {
      id: {
        type: "integer",
        minimum: 1,
      },
      name: {
        type: "string",
        minLength: 1,
      },
    },
    required: [],
  };

  public constructor(
    public readonly id: number | undefined = undefined,
    public readonly name: string | undefined = undefined
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static parse(object: any): TagRequest {
    assertIntOptional("id", object.id);
    assertIntPositiveOptional("id", object.id);
    assertStringOptional("name", object.name);

    return new TagRequest(object.id, object.name);
  }
}
