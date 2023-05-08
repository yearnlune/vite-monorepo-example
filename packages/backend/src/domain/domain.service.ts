import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';
import { Base } from '@/domain/base.schema';
import { EmptyUpdateException } from '@/exception/emptyUpdate.exception';
import { ItemNotFound } from '@/exception/itemNotFound.exception';
import { CommonSort } from '@example/common';

export class DomainService<T extends Base> {
  private readonly injectModel: mongoose.Model<T>;
  private readonly log = new Logger(DomainService.name);

  constructor(model: mongoose.Model<T>) {
    this.injectModel = model;
  }

  /**
   * Creates a new instance of the `T` class and saves it.
   *
   * @param model The model to create.
   * @returns The saved model.
   */
  create(model: any): Promise<T> {
    const newModel = new this.injectModel(model);
    return newModel.save().then((item) => item.toDto());
  }

  /**
   * Finds a single document by ID.
   *
   * @param id The ID of the document to find.
   * @returns A promise that resolves to the document or rejects if the document does not exist.
   */
  findOne(id: string): Promise<any> {
    const query = {
      _id: new mongoose.Types.ObjectId(id),
      deleted: false,
    };

    return this.injectModel
      .findOne(query)
      .then((item) => {
        return (
          item?.toDto() ?? Promise.reject(new ItemNotFound(`'${id}' not found`))
        );
      })
      .catch((e) => {
        this.log.error(e);
        throw e;
      });
  }

  /**
   * Finds all documents.
   *
   * @param options The options for the query.
   * @param search - The search terms.
   * @returns A promise that resolves to an array of documents.
   */
  findAll(
    options: {
      offset: number;
      limit: number;
      sorts?: CommonSort[];
    },
    search?: Record<string, string>,
  ): Promise<any[]> {
    const query = { ...search, deleted: false };
    const queryOptions: any = {};

    if (options.sorts) {
      queryOptions.sort = this.toSortQuery(options.sorts);
    }

    if (options.offset) {
      queryOptions.skip = options.offset;
    }

    if (options.limit) {
      queryOptions.limit = options.limit;
    }

    return this.injectModel
      .find(query, [], queryOptions)
      .then((items) => items.map((item) => item.toDto()))
      .catch((e) => {
        this.log.error(e);
        throw e;
      });
  }

  /**
   * Updates a document by ID.
   *
   * @param id The ID of the document to update.
   * @param any The document data to update.
   * @param upsert If true, the document will be created if it does not exist.
   * @returns A promise that resolves to the document or rejects if the document does not exist.
   */
  update(id: string, update: Record<string, any>, upsert: boolean = false) {
    if (!update) {
      throw new EmptyUpdateException('update is empty');
    }

    update.updatedAt = new Date();

    return this.injectModel
      .findByIdAndUpdate(id, { $set: update }, { upsert: upsert })
      .then(
        (item) =>
          item?.toDto() ??
          Promise.reject(new ItemNotFound(`'${id}' not found`)),
      )
      .catch((e) => {
        this.log.error(e);
        throw e;
      });
  }

  /**
   * Deletes a document by ID.
   *
   * @param id The ID of the document to delete.
   * @returns A promise that resolves to the number of documents deleted or rejects if the document does not exist.
   */
  delete(id: string) {
    return this.injectModel
      .updateOne(
        {
          _id: new mongoose.Types.ObjectId(id),
          deleted: false,
        },
        {
          $set: {
            deleted: true,
          },
        },
      )
      .catch((e) => {
        this.log.error(e);
        throw e;
      });
  }

  /**
   * Converts a list of sort options to a query object.
   *
   * @param sorts The list of sort options.
   * @returns A query object.
   */
  toSortQuery(sorts: CommonSort[] = []): Record<string, 1 | -1> {
    const sortMeta: Record<string, 1 | -1> = { asc: 1, desc: -1 };
    const computedSorts: CommonSort[] = sorts;
    if (computedSorts.length === 0) {
      computedSorts.push({
        property: 'createdAt',
        direction: 'asc',
      });
    }

    return sorts
      .map((sort) => {
        return {
          [sort.property]: sortMeta[sort.direction.toLocaleLowerCase()],
        };
      })
      .reduce((prev, cur) => {
        return { ...prev, ...cur };
      }, {});
  }
}
