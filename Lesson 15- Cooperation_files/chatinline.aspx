

   	// livechat by www.mylivechat.com/

   	
	// first loading
   	if(typeof(MyLiveChat)=="undefined")
   	{
   		MyLiveChat={};
   		MyLiveChat.RawConfig={WidgetOpenNewWindow:"True",InlineChatHideSubject:"1",WaitingFieldQuestion:"1",WebConsoleRedirectTime:"636473231356692620",InPageHeadBgColor:"#4caf50",InlineChatOfflineLogo:"upload",InlineChatWaitingFieldDepartment:"1",OperatingHoursCheckDay6:"0",InlineChatBubbleUIMode:"1",InPageUseBubbleTopOnlineOnly:"0",OperatingHoursCheckDay5:"0",OperatingHoursCheckDay2:"0",OperatingHoursCheckDay3:"0",OperatingHoursCheckDay0:"0",OperatingHoursCheckDay1:"0",WaitingShowForInvite:"0",DialogWidth:"580",SoundVisitorVolume:"84",InlineChatmaxWaitTime:"300",RoutingNoWait:"True",LS_ShowAllCustomers:"Strict",SoundInvitation:"alarm",ButtonOpenNewWindow:"False",SupportPhoto:"3",UIMobileMode:"Inline",InPageBubbleTop:"1",DialogHeight:"420",InPageUseBubbleTop:"0",SoundJoinVolume:"98",OperatingHoursCheckDay4:"0",InlineChatOnlineLogo:"upload",WaitingShowForSmart:"1",OperatingHoursCheckWeekday:"1",InPageTemplate:"5",OperatingHoursSchedule:"0",SoundNudge:"msn_nudge",WaitingLogo:"upload",SoundRequest:"ring",InlineChatWaitingFieldEmail:"1",OperatingHoursValWeekday:"9:00-18:00",InlineChatOnholdWaitTime:"60",SoundVisitor:"online",InPageTemplateMobile:"0",maxWaitTime:"300",InPageHeadColor:"#faf5f5",WaitingFieldEmail:"1",WaitingPhoto:"3",UIDialogMode:"Classic",RoutingEnable:"True",InlineChatTimestampVisible:"1",UIPopupMode:"Classic",RoutingTimeout:"30",BrandLogo:"https://s3.amazonaws.com/ahs-images/images/general/LC+Logo.png",SoundJoin:"online",SoundRequestVolume:"98",WaitingFieldDepartment:"1",OperatingHoursCheckWeekend:"0",InPageImageOffline:"1",WaitingShowForClick:"1",InlineChatWaitingShowForClick:"1",DialogChatHeadlineStyle:"color:#000000",WaitingDepartmentMode:"",InlineChatWaitingFieldQuestion:"1",InPageImageOnline:"1",OnholdWaitTime:"120",SoundMessage:"msn_message",MessageTimestampVisible:"1",SoundMessageVolume:"98"};
   		MyLiveChat.RawQuery={hccid:"47166519",apimode:"chatinline"};
   		for(var mlcp in MyLiveChat.RawConfig)
   		{
   			MyLiveChat[mlcp]=MyLiveChat.RawConfig[mlcp];
   		}
   		for(var mlcp in MyLiveChat.RawQuery)
   		{
   			MyLiveChat[mlcp]=MyLiveChat.RawQuery[mlcp];
   		}

   		MyLiveChat.HCCID='47166519';
   		MyLiveChat.PageBeginTime=new Date().getTime();
   		MyLiveChat.LoadingHandlers=[];
   		//	,"Departments"
   		MyLiveChat.CPRFIELDS=["SyncType","SyncStatus","SyncResult","HasReadyAgents","VisitorUrls","VisitorStatus","VisitorDuration","VisitorEntryUrl","VisitorReferUrl"];
	   }
	   else
	   {
	   	MyLiveChat.MultiLinked=true;
	   }
	


   	MyLiveChat.Version=3006;
   	MyLiveChat.FirstRequestTimeout=10800;
   	MyLiveChat.NextRequestTimeout=21600;
   	MyLiveChat.SyncType=null;
   	MyLiveChat.SyncStatus="LOADING";
   	MyLiveChat.SyncUserName=null;
   	MyLiveChat.SyncResult="LOADING";
   	MyLiveChat.HasReadyAgents=false;
   	MyLiveChat.SourceUrl="https://thefamilyschoolonline.org/";
   	MyLiveChat.AgentTimeZone=parseInt("-5" || "-5");
   	MyLiveChat.VisitorStatus="";
   	MyLiveChat.UrlBase="https://a1.mylivechat.com/livechat2/";
   	MyLiveChat.SiteUrl="https://a1.mylivechat.com/";

   	
	
   	MyLiveChat.Departments=[];

   	MyLiveChat.Departments.push({
   		Name:"Default",
   		Agents:[{
   			Id:'User:1',
   			Name:"Elizabeth",
   			Online:false
   			},{
   			Id:'User:12',
   			Name:"Peter",
   			Online:false
   			}],
   		Online:false
   		});

   	MyLiveChat.Departments.push({
   		Name:"Potential Member Support",
   		Agents:[{
   			Id:'User:1',
   			Name:"Elizabeth",
   			Online:false
   			},{
   			Id:'User:12',
   			Name:"Peter",
   			Online:false
   			}],
   		Online:false
   		});

   	MyLiveChat.Departments.push({
   		Name:"Existing Member Support",
   		Agents:[{
   			Id:'User:1',
   			Name:"Elizabeth",
   			Online:false
   			},{
   			Id:'User:12',
   			Name:"Peter",
   			Online:false
   			}],
   		Online:false
   		});


	
   	MyLiveChat.VisitorUrls=[];


	
   	

   	function MyLiveChat_AddScript(tag)
   	{
   		var func=MyLiveChat_AddScript;
   		var arr=func._list;
   		if(!arr)func._list=arr=[];
   		if(func._loading)
   		{
   			arr.push(tag);
   			return;
   		}
   		function ontagload()
   		{
   			func._loading=false;
   			if(!arr.length)return;
   			tag=arr.shift();
   			LoadTag();
   		}
   		function LoadTag()
   		{
   			func._loading=true;
   			if('onload' in tag)
   			{
   				tag.onload=ontagload;
   			}
   			else
   			{
   				var iid=setInterval(function()
   				{
   					if(tag.readyState!='complete'&&tag.readyState!='loaded')
   						return;
   					clearInterval(iid);
   					ontagload();
   				},10);
   			}
   			var p=document.getElementsByTagName("head")[0]||document.body;
   			p.insertBefore(tag,p.firstChild);
   		}
   		LoadTag();
   	}

   	function MyLiveChat_GetLastScriptTag()
   	{
   		var coll=document.getElementsByTagName("script");
   		return coll[coll.length-1];
   	}
   	function MyLiveChat_ImportCss(url)
   	{
   		var p=document.head||document.getElementsByTagName("head")[0]||document.body;
   		var tag=document.createElement("link");
   		tag.setAttribute("rel","stylesheet");
   		tag.setAttribute("href",url);
   		p.insertBefore(tag,p.firstChild);
   	}
   	function MyLiveChat_DocWrite(html,relativetag)
   	{
   		if(html.substr(0,7)=="<script")	//Low IE interactive or defer
   		{
   			var src=html.match(/src=["']?([^"'>]*)["']/)[1];
   			if(!MyLiveChat.LoadedScripts)MyLiveChat.LoadedScripts={};
   			if(MyLiveChat.LoadedScripts[src])return;
   			MyLiveChat.LoadedScripts[src]=true;
			
   			var tag=document.createElement("script");
   			tag.setAttribute("src",src);
   			MyLiveChat_AddScript(tag);
   		}
   		else
   		{
   			if(!document.body||document.readyState=="loading")
   			{
   				document.write(html);
   				return;
   			}

   			if(!relativetag)relativetag=MyLiveChat_GetLastScriptTag();
   			var div = document.createElement("DIV");
   			div.innerHTML = html;
   			while (true) {
   				var c = div.firstChild;
   				if (!c) break;
   				div.removeChild(c);
   				relativetag.parentNode.insertBefore(c,relativetag);
   			}
   		}
   	}
	
   	MyLiveChat.NewGuid=function()
   	{
   		var guid = "";
   		for (var i = 1; i <= 32; i++){
   			guid +=Math.floor(Math.random()*16.0).toString(16);
   			if(i==8||i==12||i==16||i==20)guid += "-";
   		}
   		return guid;    
   	}

   	MyLiveChat.RandomID=MyLiveChat.NewGuid();

   	

   	MyLiveChat.VisitorDuration=0;
   	MyLiveChat.VisitorEntryUrl="";
   	MyLiveChat.VisitorReferUrl="";

   	MyLiveChat.ShowButton=true;
   	MyLiveChat.ShowLink=true;
   	MyLiveChat.ShowBox=true;
   	MyLiveChat.ShowSmart=false;


   	MyLiveChat.NoPrivateLabel=false;


   	MyLiveChat.LoadingHandlers.push(function(funcself)
   	{
   		MyLiveChat_RunLoadingHandler('chatinline',funcself);
   	});

   	MyLiveChat.ResourcesVary="\x26culture=en-US\x26mlcv=3006\x26template=5";

   	
   	
   	
   	
   	MyLiveChat['chatinline'+"_script_tag"]=MyLiveChat_GetLastScriptTag();

   	if(typeof(MyLiveChat_Initialize)!="undefined")
   	{
   		MyLiveChat_Initialize()
   	}
   	else if(!MyLiveChat.MultiLinked)
   	{
   		MyLiveChat_ImportCss(MyLiveChat.UrlBase+"chatinline.css");
   		MyLiveChat_DocWrite("<script defer='defer' src='"+MyLiveChat.UrlBase+"resources2.aspx?HCCID="+MyLiveChat.HCCID+MyLiveChat.ResourcesVary+"'></scr"+"ipt>");
   		MyLiveChat_DocWrite("<script defer='defer' src='"+MyLiveChat.UrlBase+"script/livechatinit2.js'></scr"+"ipt>");
   	}


   	