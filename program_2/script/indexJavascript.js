
$(document).ready(function () {

    var htmlCode = `<form>
                        <div class="form-group row">
                            <label for="item-name" class="col-sm-2 col-form-label" >Name</label>
                            <input type="text" class="form-control col-sm-10" id="item-name" placeholder="Enter name of the item">
                        </div>
                        <div class="form-group row">
                            <label for="ControlSelect1" class="col-sm-2 col-form-label">Does it smell?</label>
                            <select class="form-control col-sm-10" id="ControlSelect1">
                                <option>select</option>
                                <option>yes</option>
                                <option>no</option>
                            </select>
                        </div>
                        <div class="form-group row">
                            <label for="ControlSelect2" class="col-sm-2 col-form-label">Is it edible?</label>
                            <select class="form-control col-sm-10" id="ControlSelect2">
                                    <option>select</option>
                                    <option>yes</option>
                                    <option>no</option>
                            </select>
                        </div>
                        <div class="form-group row">
                            <label for="ControlSelect3" class="col-sm-2 col-form-label">Are you a vegan?</label>
                            <select class="form-control col-sm-10" id="ControlSelect3">
                                    <option>select</option>
                                    <option>yes</option>
                                    <option>no</option>
                            </select>
                        </div>
                        <hr>
                    </form>
                    `;

    $('#submitButton').click(function () {
        
        let formData =[];
        let flag = 1; 
        $('form').each(function (){

            let count = 0;
            let name = $(this).find('div:nth-child(1) input').val();
            let question1 = $(this).find('div:nth-child(2) option:selected').text();
            let question2 = $(this).find('div:nth-child(3) option:selected').text();
            let question3 = $(this).find('div:nth-child(4) option:selected').text();
            
            if( name === '' ) {
                $(this).find('div:nth-child(1) input').css('background-color', '#ff9999');
                $(this).find('div:nth-child(1) input').attr('placeholder','please enter a valid name');
                
            } else {
                $(this).find('div:nth-child(1) input').css('background-color', '');
                count++;
            }

            if( question1 == 'select' ) {
                $(this).find('div:nth-child(2) select').css('background-color', '#ff9999');

            } else {
                $(this).find('div:nth-child(2) select').css('background-color', '');
                count++;
            }

            if( question2 == 'select' ) { 
                $(this).find('div:nth-child(3) select').css('background-color', '#ff9999');

            } else {
                $(this).find('div:nth-child(3) select').css('background-color', '');
                count++;
            }

            if( question3 == 'select' ) {
                $(this).find('div:nth-child(4) select').css('background-color', '#ff9999');
            } else {
                $(this).find('div:nth-child(4) select').css('background-color', '');
                count++;
            }
            

            if( count == 4 ) {
                formData.push({
                    'name': name,
                    'question1': question1,
                    'question2': question2,
                    'question3': question3
                });
            }
            else {
                flag = 0;
            }
        });
        

        if( flag == 1 ) {


            $.ajax({
                type: "POST",
                url: 'http://127.0.0.1:8000/',
                dataType: 'json',
                data: {'formData': JSON.stringify(formData) },
                success: function( response ) {
                    
                    let dynamicResultsTable = `<table style="width:100%">
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                    </tr>`;

                    for (let i = 0; i < response.length; i++) {
                        dynamicResultsTable += `<tr>
                                            <td>${response[i]['name']}</td>
                                            <td>${response[i]['type']}</td>
                                          </tr>`;
                    }
                    dynamicResultsTable += `</table>`;
                    $('#myModal .modal-dialog .modal-content .modal-body').empty();
                    $('#myModal .modal-dialog .modal-content .modal-body').append(dynamicResultsTable);
                    $('#myModal').modal('show');
                },
                error: function() {
                    alert('post request failed');
                }
            });
        };

    });


    
    $('#addItem').click(function (){
        
        $('.newItem').append(htmlCode)

    });

    $('#deleteItem').click(function (){

        $('.newItem form').last().remove();
    })

});