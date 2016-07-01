/**
 * 
 */

function templateOffertoFamily (){

	
	var emailOffterToFamily = 
'		<html>' +
'		<body>' +
'		    <table width="650px" cellspacing="0" cellpadding="0" border="0.2" color:"blue">' +
'		        <tr>' +
'		            <td class="navbar navbar-inverse" align="center">' +
'		                <!-- This setup makes the nav background stretch the whole width of the screen. -->' +
'		                <table width="650px" cellspacing="0" cellpadding="3" class="container">' +
'		                    <tr class="navbar navbar-inverse">' +
'		                        <td colspan="4">' +
'									<img src="http://' + localStorage.mainHost + ':8080/casamundo/img/logo/casatoronto.png"></img>' + 
'								</td>' +
'		                        <td>' +
'									<ul>' +
'										<li>' +
'											<span>+1(416)897-7141</span>' +
'										</li>' +
'										<li>' +
'											<a href="mailto:josematheus@casa-toronto.com">josematheus@casa-toronto.com</a>' +
'										</li>' +
'										<li>' +
'											<a href="www.casa-toronto.com">www.casa-toronto.com</a>' +
'										</li>' +
'										<li>' +
'											<span >153 Beecroft Rd, suite 1512</span>' +
'										</li>' +
'										<li>' +
'											<span >Toronto, ON Canada M2N 7C5</span>' +
'										</li>' +
'									</ul>' +
'								</td>' +
'		                    </tr>' +
'		                </table>' +
'		            </td>' +
'		        </tr>' +
'		        <tr>' +
'		            <td bgcolor="white" align="left">' +
'	    	            <table width="900px" cellspacing="0" cellpadding="3" align="center">' +
'	                    <tr>' +
'	                        <td align="left">' +
'										<p >' +
'											<span style="font-style: italic;font-size: 20px;" >Dear Family <small id="familyName" style="font-style: italic;font-size: 20px;">' + $('#familyName').html() + '</small></span>' +
'										</p>' +
'										<p >' +
'											<span ><small style="font-style: italic;font-size: 20px;">Would you like to host the student below</small></span>' +
'										</p>' +
'	                        </td>' +
'	                    </tr>' +
'		                </table>' +
'		            </td>' +
'		        </tr>' +
	'	        <tr>' +
	'	            <td bgcolor="white" align="center">' +
	'	                <table width="650px" cellspacing="0" cellpadding="3" align="center">' +
	'	                    <tr>' +
	'	                        <td align="left">' +
'									<a href="http://' + localStorage.mainHost + ':8080/casamundo/rest/student/changeStatus?params=mail:' + $("#emailStudent").val() + '/indexTrip:' + $("#indexTrip").val() + '/status:Confirmed/familyName:' +  $("#familyName").html() + '/emailFamily:' +  $("#emailFamily").val() + '/emailFamily:' +  $("#emailFamily").val() + '/roomSingle:' +  $("#roomSingle").val() + '/roomCouple:' +  $("#roomCouple").val() + '/reason:Accept" style="background-color:lightblue;width:50px;height:30px" type="button" >Yes, I accept offer</a>' +
'									<span>    </span>' +
'									<a href="http://' + localStorage.mainHost + ':8080/casamundo/rest/student/changeStatus?params=mail:' + $("#emailStudent").val() + '/indexTrip:' + $("#indexTrip").val() + '/status:Available/familyName:' +  $("#familyName").html() + '/emailFamily:' +  $("#emailFamily").val() + '/roomSingle:' +  $("#roomSingle").val() + '/roomCouple:' +  $("#roomCouple").val() + '/roomCouple:' +  $("#roomCouple").val() + '/reason:Accept" style="background-color:orange;width:50px;height:30px" type="button" >Room not available</a>' +
'									<span>    </span>' +
'									<a href="http://' + localStorage.mainHost + ':8080/casamundo/rest/student/changeStatus?params=mail:' + $("#emailStudent").val() + '/indexTrip:' + $("#indexTrip").val() + '/status:Available/familyName:' +  $("#familyName").html() + '/emailFamily:' +  $("#emailFamily").val() + '/roomSingle:' +  $("#roomSingle").val() + '/roomCouple:' +  $("#roomCouple").val() + '/roomCouple:' +  $("#roomCouple").val() + '/reason:Accept" style="background-color:red;width:50px;height:30px" type="button" >Refuse student</a>' +
	'	                        </td>' +
	'	                    </tr>' +
	'	                </table>' +
	'	            </td>' +
	'	        </tr>' +
	'	        <tr>' +
	'	            <td bgcolor="white" align="center">' +
	'	                <table width="650px" cellspacing="0" cellpadding="3" align="center">' +
	'	                    <tr>' +
	'							<td></td>'	+						
	'	                        <td align="left">' +
	'									<ul >' +
	'										<li>' +
	'											<span style="font-size: 20px; font-weight: bold;" ><small id="studentCompleteName" style="font-size: 20px; font-weight: bold;">' + $('#studentCompleteNameEmail').html() + '</small></span>' +
	'										</li>' +
	'										<li>' +
	'											<span style="font-size: 15px; font-style: italic;" ><small id="celPhone" style="font-size: 15px; font-style: italic;">' + $('#celPhoneEmail').html() + '</small></span>' +
	'										</li>' +
	'										<li>' +
	'											<span style="font-size: 15px; font-style: italic;" ><small id="mail" style="font-size: 15px; font-style: italic;">' + $('#phoneEmail').html() + '</small></span>' +
	'										</li>' +
	'									</ul>' +
	'	                        </td>' +
	'	                    </tr>' +
	'	                </table>' +
	'	            </td>' +
	'	        </tr>' +
	'	        <tr>' +
	'	            <td bgcolor="white" align="center">' +
	'	                <table width="650px" cellspacing="0" cellpadding="3" align="center">' +
	'	                    <tr>' +
	'							<td align="left">' +
	'	 			   	            <table width="300px" cellspacing="0" cellpadding="3" align="center">' +
	'			                    <tr>' +
	'									<td align="left">' +
  '											<small style="font-size: 15px; font-style: italic;" >Birth:</small><small style="color: blue; font-size: 15px;" >' + $('#birthDayEmail').html() + '</small>' +
	'										<small style="font-size: 15px; font-style: italic;" > - Age:</small><small style="color: blue; font-size: 15px;" >' + $('#ageEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Gender:</small><small style="color: blue; font-size: 15px;" >' + $('#genderEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Nationality:</small><small style="color: blue; font-size: 15px;" >' + $('#nationalityEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'	                			</table>' +
'								</td>'	+						
	'	                        <td align="left">' +
	'	 			   	            <table width="300px" cellspacing="0" cellpadding="3" align="center">' +
	'			                    <tr>' +
	'									<td align="left">' +
  '											<small style="font-size: 15px; font-style: italic;" >First Language:</small><small style="color: blue; font-size: 15px;" >' + $('#firstLanguageEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Profession:</small><small style="color: blue; font-size: 15px;" >' + $('#professionEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >English Level:</small><small style="color: blue; font-size: 15px;" >' + $('#englishLevelEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'	                			</table>' +
	'	                        </td>' +
	'	                        <td align="left">' +
	'	 			   	            <table width="300px" cellspacing="0" cellpadding="3" align="center">' +
	'			                    <tr>' +
	'									<td align="left">' +
  '											<small style="font-size: 15px; font-style: italic;" >School:</small><small style="color: blue; font-size: 15px;" >' + $('#schoolNameEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Agency:</small><small style="color: blue; font-size: 15px;" >' + $('#agencyNameEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'	                			</table>' +
	'	                        </td>' +
	'	                    </tr>' +
	'						<br>' +
	'	                    <tr>' +
	'							<td align="left">' +
	'	 			   	            <table width="300px" cellspacing="0" cellpadding="3" align="center">' +
	'			                    <tr>' +
	'									<td align="left">' +
  '											<small style="font-size: 15px; font-style: italic;" >Start:</small><small style="color: blue; font-size: 15px;" >' + $('#startEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >End:</small><small style="color: blue; font-size: 15px;" >' + $('#endEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
  '											<small style="font-size: 15px; font-style: italic;" >Arrival Date:</small><small style="color: blue; font-size: 15px;" >' + $('#arrivalDateEmail').html() + '</small>' +
	'										<small style="font-size: 15px; font-style: italic;" > - Time:</small><small style="color: blue; font-size: 15px;" >' + $('#arrivalTimeEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Flight Number:</small><small style="color: blue; font-size: 15px;" >' + $('#flightNumberEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Flight Date:</small><small style="color: blue; font-size: 15px;" >' + $('#flightDateEmail').html() + '</small>' +
	'										<small style="font-size: 15px; font-style: italic;" > - Time:</small><small style="color: blue; font-size: 15px;" >' + $('#flightTimeEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Airline:</small><small style="color: blue; font-size: 15px;" >' + $('#airlineEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'	                			</table>' +
	'	                        </td>' +
	'	                        <td align="left">' +
	'	 			   	            <table width="300px" cellspacing="0" cellpadding="3" align="center">' +
	'			                    <tr>' +
	'									<td align="left">' +
  '											<small style="font-size: 15px; font-style: italic;" >Smoke:</small><small style="color: blue; font-size: 15px;" >' + $('#smokeEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Meal Plan:</small><small style="color: blue; font-size: 15px;" >' + $('#mealPlanEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Special diet:</small><small style="color: blue; font-size: 15px;" >' + $('#specialDietEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'	                			</table>' +
	'	                        </td>' +
	'	                        <td align="left">' +
	'	 			   	            <table width="300px" cellspacing="0" cellpadding="3" align="center">' +
	'			                    <tr>' +
	'									<td align="left">' +
  '											<small style="font-size: 15px; font-style: italic;" >Live with dogs:</small><small style="color: blue; font-size: 15px;" >' + $('#liveDogsEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Live with cats:</small><small style="color: blue; font-size: 15px;" >' + $('#liveCatsEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'			                    <tr>' +
	'									<td align="left">' +
	'										<small style="font-size: 15px; font-style: italic;" >Private washroom:</small><small style="color: blue; font-size: 15px;" >' + $('#privateWashroomEmail').html() + '</small>' +
	'			                        </td>' +
	'			                    </tr>' +
	'	                			</table>' +
	'	                        </td>' +
	'	                    </tr>' +
	'						<br>' +	
	'	                    <tr>' +
'									<td align="left">' +
'										<small style="font-size: 15px; font-style: italic;" >Hobbies/Interest:</small><small style="color: blue; font-size: 15px;" >' + $('#hobbiesEmail').html() + '</small>' +
'			                        </td>' +
'									<td align="left">' +
'										<small style="font-size: 15px; font-style: italic;" >Alergies or Medical Concern:</small><small style="color: blue; font-size: 15px;" >' + $('#medicalEmail').html() + '</small>' +
'			                        </td>' +
'									<td align="left">' +
'										<small style="font-size: 15px; font-style: italic;" >Comments:</small><small style="color: blue; font-size: 15px;" >' + $('#commentsEmail').html() + '</small>' +
'			                        </td>' +
	'	                    </tr>' +
	'						<br>' +	
	'	                    <tr>' +
'	 			   	            <table width="900px" cellspacing="0" cellpadding="3" align="center">' +
'			                    <tr>' +
'									<td align="left">' +
'										<small style="font-size: 15px; font-style: italic;" >Caretaker Comments:</small><small style="color: blue; font-size: 15px;" >' + $('#commentsCaretakerEmail').val() + '</small>' +
'			                        </td>' +
'	                    		</tr>' +
'	                			</table>' +
'	                    </tr>' +
	'	                </table>' +
	'	            </td>' +
	'	        </tr>' +
'	    </table>' +
'	</body>' +
'	</html>';
	return emailOffterToFamily;
}
