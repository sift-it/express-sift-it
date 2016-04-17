import * as Tape from "tape";
import { Queryable } from "../../src/queryable";

Tape.test("Skipping items", (test: any) => {

  test.test("skipping no items", (test: any) => {
    test.test("no items returned if none input", (test: any) => {

      let data: Array<any> = [];
      let queryable = new Queryable<any>(data);
      queryable.skip(0);

      test.equal(queryable.toArray().length, 0);

      test.end();
    });

    test.test("one item returned if one input", (test: any) => {

      let data: Array<any> = [{}];
      let queryable = new Queryable<any>(data);
      queryable.skip(0);

      test.equal(queryable.toArray().length, 1);

      test.end();
    });
  });

  test.test("skipping one item", (test: any) => {
    test.test("no items returned if one input", (test: any) => {

      let data: Array<any> = [{}];
      let queryable = new Queryable<any>(data);
      queryable.skip(1);

      test.equal(queryable.toArray().length, 0);

      test.end();
    });

    test.test("one item returned if two input", (test: any) => {

      let data: Array<any> = [{}, {}];
      let queryable = new Queryable<any>(data);
      queryable.skip(1);

      test.equal(queryable.toArray().length, 1);

      test.end();
    });
  });
});
