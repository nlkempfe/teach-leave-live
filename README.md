# teach-leave-live

To clone this repo, follow these steps:

    Go to "Git Bash" just like cmd. Right click and "Run as Administrator".
    Type ssh-keygen
    Press enter.
    It will ask you to save the key to the specific directory.
    Press enter. It will prompt you to type password or enter without password.
    The public key will be created to the specific directory.
    Now go to the directory and open .ssh folder.
    You'll see a file id_rsa.pub. Open it on notepad. Copy all text from it.
    Go to https://gitlab.com/profile/keys .
    Paste here in the "key" textfield.
    Now click on the "Title" below. It will automatically get filled.
    Then click "Add key".

Then, you can clone the repo as normal, e.g. 'git clone git@gitlab.com:nlkempfe/teach-leave-live.git'

Source: https://stackoverflow.com/questions/40427498/getting-permission-denied-public-key-on-gitlab
