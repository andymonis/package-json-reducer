# package-json-reducer
Utility to remove specified fields from a package.json file and save to a different location. More specifically this is useful for removing entries in 'scripts' that maybe used for dev testing that you don't want in an external release of your library.

#usage 

* -s 'param1 param2' A list of params to remove from the top level
* -o /path A location to store the output file

package-json-reducer -s 'param1 ...' -o /path/to/output /path/to/input


```sh
package-json-reducer -s 'config devDependencies directories scripts' -o test/package.reduced test/package.json
```