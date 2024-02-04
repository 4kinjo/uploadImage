const { Octokit } = require("@octokit/rest");

document.getElementById('fileInput').addEventListener('change', function () {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const img = document.getElementById('img');
        img.src = reader.result;
    };

    reader.readAsDataURL(file);
});

document.getElementById('upload').addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const content = reader.result.split(',')[1]; // remove the prefix of the base64 string
        const repoName = 'imageUpload';
        const userName = '4kinjo';
        const token = process.env.GITHUB_API_KEY;

        const octokit = new Octokit({ auth: `token ${token}` });

        try {
            octokit.repos.createOrUpdateFileContents({
                owner: userName,
                repo: repoName,
                message: 'upload image',
                content: content
            })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }


    };

    reader.readAsDataURL(file);
});
