function(context, args)
{
	var run;
	var match;
	var param = "";
	var ob = {};
	var users = #db.f({id:"users"}).first().u;
	var out = {msg:""};

	function c(s,o){
		return #fs.clonex10100.decor({t:s,o:o}).msg;
	}

	for(var username in users){
		ob.username = users[username];
		run = c(args.t,ob)
		if(!run.includes("not exist")){

			if(param === ""){
				param = run.split("\n")[2].slice(2,-1);
				ob[param] = "account";
				run = c(args.t,ob);
				out.msg += "param: " +param + "\n";
	
			}
			out.msg += "Username : " + users[username] + "\n";
			run = run.split("\n");
			for(var lc = 6; lc < run.length; lc++){
				out.msg += run[lc] + "\n";
			}

		}
	}
	out.msg = out.msg.slice(0,-1);
	out.ok = true;
	return out;
}
