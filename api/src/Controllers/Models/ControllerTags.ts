import { PrismaClient, Tag } from "@prisma/client";
import TagRequest from "../../Models/TagRequest";
import TagResponse from "../../Models/TagResponse";
import { assertNonNull } from "../../Common/validation";
import ControllerModelBase from "../Base/ControllerModelBase";

export default class ControllerTags extends ControllerModelBase<
  TagRequest,
  TagResponse
> {
  public constructor(private readonly prismaClient: PrismaClient) {
    super({ baseUrl: "/tag" });
  }

  protected override async getModels(
    id: number | undefined
  ): Promise<Iterable<TagResponse>> {
    return (
      await this.prismaClient.tag.findMany({
        where: {
          id,
        },
      })
    ).map((model: Tag) => {
      return new TagResponse(model.id, model.name);
    });
  }

  protected override async updateModel(request: TagRequest): Promise<void> {
    assertNonNull("id", request.id);
    assertNonNull("name", request.name);

    await this.prismaClient.tag.update({
      where: {
        id: request.id,
      },
      data: {
        name: request.name,
      },
    });
  }

  protected override async addModel(request: TagRequest): Promise<number> {
    assertNonNull("name", request.name);

    return (
      await this.prismaClient.tag.create({
        data: {
          name: <string>request.name,
        },
      })
    ).id;
  }

  protected override async removeModel(id: number): Promise<void> {
    await this.prismaClient.tag.delete({
      where: {
        id,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected override parseRequest(body: any): TagRequest {
    return TagRequest.parse(body);
  }
}
