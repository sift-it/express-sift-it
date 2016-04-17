import * as Tape from "tape";
import { Queryable } from "../../src/queryable";

Tape.test("taking items", (test: any) => {

  test.test("taking no items", (test: any) => {
    test.test("no items returned if none input", (test: any) => {

      let data: Array<any> = [];
      let queryable = new Queryable<any>(data);
      queryable.take(0);

      test.equal(queryable.toArray().length, 0);

      test.end();
    });

    test.test("no items returned if one input", (test: any) => {

      let data: Array<any> = [{}];
      let queryable = new Queryable<any>(data);
      queryable.take(0);

      test.equal(queryable.toArray().length, 0);

      test.end();
    });
  });

  test.test("taking one item", (test: any) => {
    test.test("one item returned if one input", (test: any) => {

      let data: Array<any> = [{}];
      let queryable = new Queryable<any>(data);
      queryable.take(1);

      test.equal(queryable.toArray().length, 1);

      test.end();
    });

    test.test("one item returned if two input", (test: any) => {

      let data: Array<any> = [{}, {}];
      let queryable = new Queryable<any>(data);
      queryable.take(1);

      test.equal(queryable.toArray().length, 1);

      test.end();
    });
  });

  test.test("taking one item after skiping one item", (test: any) => {
    test.test("no items returned if one input", (test: any) => {

      let data: Array<any> = [{}];
      let queryable = new Queryable<any>(data);
      queryable.skip(1);
      queryable.take(1);

      test.equal(queryable.toArray().length, 0);

      test.end();
    });

    test.test("one item returned if two input", (test: any) => {

      let data: Array<any> = [{}, {}];
      let queryable = new Queryable<any>(data);
      queryable.skip(1);
      queryable.take(1);

      test.equal(queryable.toArray().length, 1);

      test.end();
    });

    test.test("one item returned if three input", (test: any) => {

      let data: Array<any> = [{}, {}, {}];
      let queryable = new Queryable<any>(data);
      queryable.skip(1);
      queryable.take(1);

      test.equal(queryable.toArray().length, 1);

      test.end();
    });
  });
});
