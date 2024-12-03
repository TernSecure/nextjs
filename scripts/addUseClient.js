import { promises as fs } from 'fs'; // Use promises for async/await
import path from 'path';

const esmDir = path.join(process.cwd(), 'dist', 'esm');
const cjsDir = path.join(process.cwd(), 'dist', 'cjs');

const addUseClient = async (dir) => {
    const files = await fs.readdir(dir);
    const promises = []; // Array to hold promises

    for (const file of files) {
        const filePath = path.join(dir, file);
        if (file.endsWith('.d.ts')) { // Check only .d.ts files
            const data = await fs.readFile(filePath, 'utf8');

            // Check if the file already contains 'use client'
            if (!data.includes("'use client'")) { // Only prepend if 'use client' is not present
                const updatedData = `'use client';\n${data}`;
                promises.push(fs.writeFile(filePath, updatedData, 'utf8').then(() => {
                    console.log(`Prepended 'use client' to ${filePath}`);
                }));
            }
        } else if (file.endsWith('.js')) { // Check for .js files to ensure .d.ts files are updated
            const dtsFilePath = filePath.replace(/\.js$/, '.d.ts');
            promises.push(fs.stat(dtsFilePath).then(async () => {
                const dtsData = await fs.readFile(dtsFilePath, 'utf8');
                if (!dtsData.includes("'use client'")) { // Only prepend if 'use client' is not present
                    const updatedDtsData = `'use client';\n${dtsData}`;
                    return fs.writeFile(dtsFilePath, updatedDtsData, 'utf8').then(() => {
                        console.log(`Prepended 'use client' to ${dtsFilePath}`);
                    });
                }
            }).catch(() => {
                // Ignore if the .d.ts file does not exist
            }));
        }
    }

    // Wait for all promises to resolve
    await Promise.all(promises);
};

// Export the function to be used in tsup.config.ts
const run = async () => {
    console.log(esmDir, cjsDir)
    await addUseClient(esmDir);
    await addUseClient(cjsDir);
};

run().catch(err => console.error(err));