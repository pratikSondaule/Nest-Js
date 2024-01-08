import { Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cats.interface";

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = []

    create(cat: Cat) {
        return this.cats.push(cat)
    }

    findAll(): Cat[] {
        return this.cats;
    }

    findOne(id: string): Cat {
        return this.cats.find((cat) => cat.id === Number(id))
    }

    updateOne(id: string, updatedCat: Cat): Cat {
        let catToUpdate = this.cats.find((cat) => cat.id === Number(id));

        if (catToUpdate) {
            catToUpdate.name = updatedCat.name || catToUpdate.name
            catToUpdate.age = updatedCat.age || catToUpdate.age
            catToUpdate.breed = updatedCat.breed || catToUpdate.breed
        }

        return catToUpdate
    }

    deleteOne(id: string) {
        let index = this.cats.findIndex((cat) => cat.id === Number(id));

        if (index !== -1) {
            const deletedCat = this.cats.splice(index, 1)[0];
            return deletedCat;
        }
    }
} 