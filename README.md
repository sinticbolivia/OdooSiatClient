## Install

```
pip install -r requirements.txt
```

## Update all submodules

Fetch and update all submodules to the latest commit on their respective branches.
This point is necessary in order to keep updated the client library

```
git submodule update --remote
git submodule foreach 'git checkout main && git pull'
```