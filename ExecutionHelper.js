const { spawn } = require('child_process');

function runProcessAndWait(command, args = []) {
    return new Promise((resolve, reject) => {
        console.log(`Executing command: ${command} ${args.join(' ')}`);

        const child = spawn(command + ' ' + args.join(' '), { shell: true });

        let stdout = '';
        let stderr = '';

        // Collect data from stdout
        child.stdout.on('data', (data) => {
            stdout += data.toString();
            process.stdout.write(data); // Optionally pipe to parent's stdout
        });

        // Collect data from stderr
        child.stderr.on('data', (data) => {
            stderr += data.toString();
            process.stderr.write(data); // Optionally pipe to parent's stderr
        });

        // Handle process exit
        child.on('close', (code) => {
            if (code === 0) {
                console.log(`Child process exited with code ${code}`);
                resolve({ stdout: stdout, stderr: stderr, code: code });
            } else {
                console.error(`Child process exited with error code ${code}`);
                reject(new Error(`Command "${command}" failed with code ${code}\nStderr: ${stderr}\nStdout: ${stdout}`));
            }
        });

        // Handle process errors (e.g., command not found)
        child.on('error', (err) => {
            console.error(`Failed to start child process: ${err.message}`);
            reject(err);
        });
    });
}

module.exports = {runProcessAndWait};