const { execSync } = require('child_process');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    console.log('Retrieving modified files...');
    const statusOutput = execSync('git status -s').toString();
    const lines = statusOutput.split('\n').filter(line => line.length >= 3);

    // Extract file paths, correctly removing the 3-character prefix: " M "
    const files = lines.map(line => {
        const parsed = line.substring(3).trim();
        if (parsed.includes(' -> ')) return parsed.split(' -> ')[1];
        return parsed;
    });

    // Ignore log files or temporary files
    const finalFiles = files.filter(f => !f.endsWith('.log') && !f.endsWith('out.txt') && !f.endsWith('out2.txt'));

    console.log(`Found ${finalFiles.length} files to commit and push.\n`);

    const BATCH_SIZE = 5;
    for (let i = 0; i < finalFiles.length; i += BATCH_SIZE) {
        const batch = finalFiles.slice(i, i + BATCH_SIZE);
        console.log(`[Batch ${i / BATCH_SIZE + 1} of ${Math.ceil(finalFiles.length / BATCH_SIZE)}] Processing files:`);
        batch.forEach(f => console.log(`  - ${f}`));

        try {
            // Add the specific files
            for (const file of batch) {
                execSync(`git add "${file}"`);
            }

            // Commit with a standard message
            let commitMsg = `Update ${batch.length} files`;
            if (batch.length === 1) {
                commitMsg = `Update ${batch[0]}`;
            }

            execSync(`git commit -m "${commitMsg}"`);
            console.log(`  > Committed batch`);

            // Push to main
            execSync('git push origin main');
            console.log(`  > Pushed to remote`);

            // Wait 5 seconds between pushes
            console.log(`  > Waiting 5 seconds before next push...`);
            await sleep(5000);

        } catch (err) {
            console.error(`  > Error processing batch: ${err.message}`);
        }
    }

    console.log('\nSequential push complete!');
}

run();
