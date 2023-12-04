import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { promisify } from 'util';

describe('End to End', () => {
    let execute = promisify(exec);

    beforeEach(() => {
        execute = promisify(exec);
    });

    it("should return the expected result for 'input.txt'", async () => {
        const fileDir = (dir: string) => `e2e/${dir}/input.txt`;

        const { stdout } = await execute(`pnpm dev < ${fileDir('inputs')}`, {});
        const formmatedStdout = stdout.split('\n').slice(4).join('\n');

        const output = readFileSync(fileDir('outputs')).toString();

        expect(formmatedStdout).toEqual(output);
    });

    it("should return the expected result for 'input0x0.txt'", async () => {
        const fileDir = (dir: string) => `e2e/${dir}/input0x0.txt`;

        const { stdout } = await execute(`pnpm dev < ${fileDir('inputs')}`, {});
        const formmatedStdout = stdout.split('\n').slice(4).join('\n');

        const output = readFileSync(fileDir('outputs')).toString();

        expect(formmatedStdout).toEqual(output);
    });

    it("should return the expected result for 'input-out-of-plateau.txt'", async () => {
        const fileDir = (dir: string) => `e2e/${dir}/input-out-of-plateau.txt`;

        const { stdout } = await execute(`pnpm dev < ${fileDir('inputs')}`, {});
        const formmatedStdout = stdout.split('\n').slice(4).toString();

        const output = readFileSync(fileDir('outputs')).toString();

        expect(formmatedStdout).toEqual(output);
    });

    it("should return the expected result for 'input-out-of-plateau2.txt'", async () => {
        const fileDir = (dir: string) => `e2e/${dir}/input-out-of-plateau2.txt`;

        const { stdout } = await execute(`pnpm dev < ${fileDir('inputs')}`, {});
        const formmatedStdout = stdout.split('\n').slice(4).join('\n');

        const output = readFileSync(fileDir('outputs')).toString();

        expect(formmatedStdout).toEqual(output);
    });
});
