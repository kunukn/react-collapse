class A {
  value = 'some value';
  static Field = 'some field';
}

export default () => {
  let log = console.log;

  log('test es8');

  let foo = async () => {
    log('async working!');
  };
  (async () => {
    await foo();
    log('after foo');
  })();

  log(...[1, 2, 3]);
  let obj = {
    a: 1,
  };

  log({
    ...obj,
  });

  log('end test es8');
};
