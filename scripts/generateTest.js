const path = require('path');
const fs = require('fs');

function generateTest (test) {
// if answer is 'Jest' create 'my.test.js' file
// run 'jest' in the npm
    const dir  = process.cwd() + '/test/';
    if (test === 'Jest'){
        // example test code
        let data = "// Jest test file \r\n test('adds 1 + 2 to equal 3', () => { \r\n     expect(1+2).toBe(3); \r\n  });"

        // const dir  = process.cwd() + '/test/';
        fs.mkdir(dir, (err) => {
        fs.writeFileSync(path.resolve(dir, 'jest.js'), data , err => {
        if (err) return console.log(err);
            console.log('mocha.js')
            })
            if (err)
            console.log(err)
        });
    }
// if answer is 'Mocha'create 'test/test.js'
// run 'mocha' in the npm
    if (test === 'Mocha'){
        // example test code
        let data = "// Mocha test file \r\n var assert = require('assert'); \r\n describe('Array', function () { \r\n " 
        + "   describe('#indexOf()', function () { \r\n    it('should return -1 when the value is not present', function () {\r\n" 
        + "     assert.equal([1, 2, 3].indexOf(4), -1); \r\n    }); \r\n }); \r\n});"
        // const dir  = process.cwd() + '/test/';
        fs.mkdir(dir, (err) => {
        fs.writeFileSync(path.resolve(dir, 'mocha.js'), data , err => {
        if (err) return console.log(err);
            console.log('mocha.js')
            })
            if (err)
            console.log(err)
        });
    }
}


module.exports = generateTest;