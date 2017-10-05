# launch.json Configaration

1) Add these line after version line in launch json

```
"configurations": [
            {
                "type": "node",
                "request": "launch",
                "name": "Launch Program",
                "program": "${workspaceRoot}/app.js",
                "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/babel-node",
                "cwd": "${workspaceRoot}",
                "sourceMaps": true
            },
            {
                "type": "node",
                "request": "attach",
                "name": "Attach to Process",
                "port": 5858
            }
        ]

```

2) For config eslint into the project First of all you have to install eslint extention `VS Code ESLint extension`

3) Then create .eslintrc file and put these line into it
```
{
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": "eslint-config-standard"
}
``` 
4) After that install relavent dev npm's

`npm -i -D eslint-config-standard eslint eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard`

5) For activate eslint auto save mode in vscode

Open `User Settings` in vscode or ```CMD + ,```

Then ```"eslint.autoFixOnSave": true```

6) Also for add editor configaration for vscode install `EditorConfigGenerator`

Then Create ```.editorconfig``` file using `CMD + SHIFT + P`

then customize it for your own one

Or you can use crowderia configaration 

```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = 1f
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = true
```
Thats it !!!