function(context, args)
{
	var trans = #hs.accts.transactions({count:"all"});
	var lib = #fs.scripts.lib();

	//List of potential answers
	var potential = []
	//Final answers to try
	var fin = []
	//stores output from running loc
	var run;
	//M is true in memo mode, false otherwise
	//if m is true, mv is false if looking for items without memos and true if looking for items with memos
	var m;
	var mv;
	//mo is n for net, w for big withdraw, and d for big deposit
	var mo;
	//Acceptable difference between two timestamps to be considered equal
	var x;
	//s and e are start and end timestamps
	var s;
	var e;
	//Debugging
	var msg = "";

	if(args.o == null){
		args.o = {};
	}

	args.o.acct_nt = "";
	run = args.t.call(args.o)

	//parse msg
	if(run.includes("without memo")){
		//If memo mode with no memos
		m = true;
		mv = false;
	}
	else if(run.includes("with memo")){
		//If memo mode with memos
		m = true;
		mv = true;
	}
	else{
		//Not memo mode
		m = false;
	}
	if(run.includes("between")){
		//Looking for net balance
		var temp = run.split(" ");
		e = temp[temp.length - 3]
		s = temp[temp.length - 1]
		x = 3;
		var single = false
		mo = "n"
	}
	else{
		//Looking for a single withdrawel or deposit
		var temp = run.split(" ");
		s = temp[temp.length - 1]
		e = null
		var single = true
		x = 60*60;
		if(run.includes("deposit")){
			mo = "d";
		}
		else if(run.includes("withdrawal")){
			mo = "w";
		};
	}
	//return{a:[e,s,mo,m,mv]}
	
	function getVal(ob){
		if(ob.sender === "clonex10100"){
			if(mo === "n"){
				return ob.amount * -1;
			}
			else if(mo === "w"){
				return ob.amount;
			}
		}
		else if(mo === "d" || mo === "n"){
			return ob.amount;
		}
		return 0;
	}
	function up(ob){
		//Add object value to all potential values
		var value = getVal(ob);
		if(value != 0){
			for(var i = 0; i < potential.length; i++){
				potential[i] += value;
			}
		}
	}
	function time(trans){
		return lib.to_game_timestr(trans.time);
	}
	function comp(a,b){
		//Compares two timestrings, x is the maximum difference where they are considered equal
		var ha = parseInt(a.slice(7,-2));
		var ma = parseInt(a.slice(-2));
		var hb = parseInt(b.slice(7,-2));
		var mb = parseInt(b.slice(-2));

		a = ha*60 + ma;
		b = hb*60 + mb;
		return Math.abs(a - b) < x;
	}
	function add(item){
		//Adds the item to the potential item array if it's not already in there
		//adds the value of time unless 0 then add 0
		if(item != 0){
			var price = getVal(item);
		}
		else{
			var price = 0;
		}
		if(!potential.includes(price)){
			potential.push(price);
		}
	}
	//tests if item satisfies memo requerments
	function memo(item){
		return (!m || ((!item.memo) != mv))
	}
	//Reading is false untill a potential start timestamp is found
	var reading = false;
	//done is false untill a potential end is found
	var done = false;
	//r is whether the potential list needs to be updated with value
	var r;
	for(var i in trans){
		if(single){
			//mo = "n";
			//This is if it's a "big deposit/withdrawel near "
			//if(comp(time(trans[i]),s)){
			//	add(trans[i]);
			//	done = true;
			//}
			//else if(done){
		//		fin = potential;
	//			break;
		//	}
			args.o.acct_nt = getVal(trans[i])
			if(args.o.acct_nt != 0 && !potential.includes(args.o.acct_nt)){
				run = args.t.call(args.o)
				potential.push(getVal(trans[i]))
				if(run.includes("LOCK_UNLOCKED")){
					return{ok:true,o:args.o,run:run,msg:[m,mv,mo,s,e]}
				}
			}
		}
		else{
			//Net/memo mode logic
			r = true
			//If satifies memo requirement and is a potential start
			//add it and 0 (zero incase the real start is after it) to the array 
			//if a potential start has already been found, add it to all potential values first
			if(memo(trans[i]) && comp(time(trans[i]),s)){
				if(r && reading){
					up(trans[i])
				}
				reading = true;
				add(trans[i]);
				add(0);
				r = false
			}
			//If item satisfies memo requirement, and is a potential end item, and a start has been found
			//then copy the array and add it to the orignal, than join the copy and original togeth
			//this is just incase there are other potential ends
			if(memo(trans[i]) && comp(time(trans[i]),e) && reading){
				done = true;
				for(var v in potential){
					if(!fin.includes(potential[v])){
					   fin.push(potential[v]);
					}
				}
				if(r && reading){
					up(trans[i])
				}
				r = false
			}
			//If the value isn't a potential start or end, and reading then update all values with it
			//if a end has been found break
			if(memo(trans[i]) && reading && r){
				if(done){
					for(var v in potential){
						if(!fin.includes(potential[v])){
						   fin.push(potential[v]);
						}
					}
					break;
				}
				up(trans[i])
			}
		}
	}
	if(args.d){
		return{p:fin,msg:[m,mv,mo,s,e,run]}
	}
	var msg = "";
	for(var l in fin){
		//If in memo mode or looking near single date, get absolute value
		if(m || single){
			args.o.acct_nt = Math.abs(fin[l])
		}
		else{
			args.o.acct_nt = fin[l]
		}
		run = args.t.call(args.o);
		msg += run + "\n";
		if(run.includes("LOCK_UNLOCKED")){
			return{ok:true,o:args.o,run:run,msg:[m,mv,mo,s,e],m:msg}
			break;
		}
	}
	//None of the potential values worked
	return {ok:false,msg:fin,o:args.o,i:msg,l:[m,mv,mo,s,e,x]};
}
