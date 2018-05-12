function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var cor = l.corruption_chars;
	if(args.t == null){
		return {ok:false,msg:"must provide target"}
	}
	var run1 = args.t.call(args.o)
	var run2 = args.t.call(args.o)
	if(Array.isArray(run1)){
		var f = true;
		run1 = run1.join("\n")
		run2 = run2.join("\n")
	}
	else{
		var f = false;
	}
	var regCor = new RegExp("`.["+cor+"]`",'g')
	run1 = run1.replace(regCor,"†")
	run2 = run2.replace(regCor,"†")
	function r(){
		run2 = args.t.call(args.o)
		if(f){
			run2 = run2.join("")
		}
		run2 = run2.replace(regCor,"†")
	}

			

	var out = ""
	for(var i = 0; i < run1.length; i++){
			if(run1[i] === "†"){
				while(run2[i] === "†"){
					r()		
				}
				out += run2[i]
			}
			else{
				out += run1[i]
			}
	}
	return {ok:true,msg:out}
}
