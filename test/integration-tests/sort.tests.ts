import * as Tape from "tape";
import { Queryable } from "../../src/queryable";

Tape.test("Sorting items", (test: any) => {

  test.test("sorting items by name", (test: any) => {
    test.test("two items ordered ascending returned by name A-Z", (test: any) => {

      let data: Array<any> = [{ name: "Anna"}, { name: "zebra"}];
      let queryable = new Queryable<any>(data);
      queryable.sortBy("name");

      test.equal(queryable.toArray()[0].name, "Anna");
      test.equal(queryable.toArray()[1].name, "zebra");

      test.end();
    });

    test.test("two items ordered descending returned by name A-Z", (test: any) => {

      let data: Array<any> = [{ name: "zebra"}, { name: "Anna"}];
      let queryable = new Queryable<any>(data);
      queryable.sortBy("name");

      test.equal(queryable.toArray()[0].name, "Anna");
      test.equal(queryable.toArray()[1].name, "zebra");

      test.end();
    });
  });

  test.test("sorting items by name descending", (test: any) => {
    test.test("two items ordered ascending returned by name Z-A", (test: any) => {

      let data: Array<any> = [{ name: "Anna"}, { name: "zebra"}];
      let queryable = new Queryable<any>(data);
      queryable.sortByDescending("name");

      test.equal(queryable.toArray()[0].name, "zebra");
      test.equal(queryable.toArray()[1].name, "Anna");

      test.end();
    });

    test.test("two items ordered descending returned by name Z-A", (test: any) => {

      let data: Array<any> = [{ name: "zebra"}, { name: "Anna"}];
      let queryable = new Queryable<any>(data);
      queryable.sortByDescending("name");

      test.equal(queryable.toArray()[0].name, "zebra");
      test.equal(queryable.toArray()[1].name, "Anna");

      test.end();
    });
  });
});
