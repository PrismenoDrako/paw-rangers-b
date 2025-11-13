export abstract class GenericRepository<T> {
    abstract save(entity: T): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract update(species: T): Promise<T>;
    abstract delete(id: number): Promise<boolean>;
}