function(context, args)
{//magnara{t:#s.}
	if (args.o == null){
		args.o = {}
	}
	args.o.magnara = ""
	var run = args.t.call(args.o)
	var match = run.split(" ")
	match =  match[match.length-1]//.slice(0,-1)
	if(match.length != 4){
		return {ok:false,msg:"too long"}
	}
	match = match.split("")
	match.sort();
	match = match.join("");
	var p = #db.f({id:"4lw"}).first()
	var t = match.split("").sort().join("")
	var l =  p[t];
	for(var i in l){
		args.o.magnara = l[i]
		run = args.t.call(args.o)
		if(!run.includes("recinroct")){
			return{ok:true,o:args.o,run:run}
		}
	}
	return{ok:false,msg:"couldn't find anagram " + match}
}
