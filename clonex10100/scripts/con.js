function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	function findP(str){
		out = [];
		for(var i = 1; i < str.length; i++){
			out.push(a(str[i]) - a(str[i-1]))
		}
		return out
	}
	function a(c){
		return"abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase())
	}
	function ai(i){
		return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i]
	}
	function mod(n) {
		return ((n % 26)+26)%26;
	}
	if(args.o == null){
		args.o = {}
	}
	args.o.CON_SPEC = ""
	var word = args.t.call(args.o).split("\n")[0]
	var pattern = findP(word)
	var l = pattern[pattern.length - 1]
	var ll = word[word.length-1]
	var out = ""
	for (var i = 0; i < pattern.length; i++){
		if(pattern[i] == l){
			var li = mod(pattern[i+1] + a(ll))
			out += ai(li)
			li = mod(pattern[i+2] + li)
			out += ai(li)
			li = mod(pattern[i+3] + li)
			out += ai(li)
			break;
		}
	}
	args.o.CON_SPEC = out;
	var run = args.t.call(args.o)
	if(!run.includes("next three")){
		return {ok:true,o:args.o,run:run};
	}
	return {ok:false,msg:"failed"}
}
