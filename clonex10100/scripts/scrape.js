function(context, args)
{
	var caller = context.caller;
	var lib = #fs.scripts.lib();
	
	//return object
	var out = {msg:""};
	//R stores run output
	var run;
	var match;
	//stores results
	var about;
	var blog;
	var param;
	var pass;
	var directory;
	//Object used to call target
	var ob = {};
	
	if(args.c == null){
		args.c = 100;
	}
	if(args.a == null){
		args.a = false;
	}

	//checks if string has any corruption
	function c(s,o){
		return #fs.clonex10100.decor({t:s,o:o}).msg;
	}

	//get param
	run = c(args.t,{});
	match = run.match(/ \w*:/);
	param = match[0].split(" ")[1].slice(0,-1);

	//get directory
	match = run.match(/:"\w*"/);
	directory = match[0].split("\"")[1];


	run = c(args.t,null).split("\n");
	match = run[run.length-1].match(/.*? |/g);
	blog = match[0].slice(0,-1);
	about = match[2].slice(0,-1);

	//Get password
	ob[param]=about;
	run = c(args.t,ob);
	match = run.match(/strategy \w* /);
	pass = match[0].split(" ")[1];

	//get projects
	var project_reg = [/of project [\w.]+/, /date for [\w.]+/,/developments on [\w.]+/, /review of [\w.]+/,/backstarters for [\w.]+/, /[\w.]+ progress/]
	var reg_word = [-1,-1,-1,-1,-1,0]
	ob[param] = blog;
	run = c(args.t,ob);
	var projects = [];
	for(var reg in project_reg){
		match = run.match(project_reg[reg]);
		if(match != null){
			var project = match[0].split(" ");
			if(reg_word[reg] < 0){
				project = project[project.length+reg_word[reg]];
			}
			else{
				project = project[reg_word[reg]];
			}
		   	if(".,".includes(project[0])){
				project = project.slice(1);
			}
		   	if(".,".includes(project[project.length -1])){
				project = project.slice(0,-1);
			}
			if(project != "project"){
				projects.push(project);
			}
		}
	}
	//find users
	var user_reg = [/\w+? of project /, /-- \w*? /]
	var reg_index = [0,1]
	var users = [];
	var user;

	ob[param] = blog;
	run = c(args.t,ob);
	for(var reg = 0; reg < user_reg.length; reg++){
		match = run.match(user_reg[reg]);
		if(match != null){
			user = match[0].split(" ");
			user = user[reg_index[reg]];
			users.push(user);
		}
	}
	var userOb = #db.f({id:"users"}).first().u;
	var usersFound = 0;
	for(var user in users){
		//out.msg+=users[user];
		if(!userOb.includes(users[user])){
			userOb.push(users[user])
			usersFound++;
		}
	}
	#db.u({id:"users"},{ $set:{u:userOb} });
	

	//get locs
	ob[param] = directory;
	ob.password = pass;
	ob.pass = pass;
	ob.p = pass;
	var index = 0;
	var loc;
	if(args.a){
		out.msg+="auto{"
	}
	out.msg += "Found " + usersFound.toString() + " new users \n";
	for(var project in projects){
		out.msg += "Project: " + projects[project] + "\n";
		ob.project = projects[project];
		run = c(args.t,ob).split("\n");
		loc = 0;
		while(loc < run.length && index <= args.c){
			if(!run[loc].includes("<")){
				if(args.a){
					out.msg += index.toString()+":#s."+run[loc]+ ", ";
				}
				else{
					out.msg += index.toString() + ": " + run[loc] + "\n";
				}
				index++;
			}
			loc++;
		}
		if(index >= args.c){
			break;
		}

	}

	out.msg = out.msg.slice(0,-1);
	if(args.a){
		out.msg = out.msg.slice(0,-1);
		out.msg+="}";
	}
	out.ok = true;
	return out;
}
