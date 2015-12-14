"use babel"

var fs = require("fs");
var path = require("path");

export function provide(){
	return class ProcessingBuildProvider {
		constructor(cwd){
			this.cwd = cwd;
		}

		getNiceName(){
			return "Processing";
		}

		isEligible(){
			if(fs.existsSync(path.join(this.cwd, path.basename(this.cwd) + ".pde"))){
				return true;
			} else {
				return false;
			}
		}

		settings(){
			function config(mode, name){
				return {
					"exec": "processing-java",
					"name": name,
					"args": [ "--sketch=\"{FILE_ACTIVE_PATH}\"", "--output=\"{PROJECT_PATH}/.build\"", "--force", "--" + mode],
					"errorMatch": [
						"\n(?<file>[\\\/0-9a-zA-Z\\._]+):(?<line>\\d+):(?<col>\\d+)"
					]
				}
			}

			return [
				config("run", "Processing - Run sketch"),
				config("present", "Processing - Run sketch fullscreen"),
				config("export", "Processing - Export application")
			];
		}
	}
}
