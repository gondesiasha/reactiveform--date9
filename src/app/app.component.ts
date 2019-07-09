import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  HttpClient } from '@angular/common/http';
import {IMyDpOptions} from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reactiveforms';
  registrationForm:FormGroup;
  arr:any=[];
  obj:any;
  data:any;
  todaydate1:any;

  



  // public myDatePickerOptions:IMyDpOptions={

  //   dateFormat:'yyyy.mm.dd',

  // };


  public myDatePickerOptions:IMyDpOptions={
  
    dateFormat: 'yyyy-mm-dd', // dd-mmm-yyyy
    editableDateField: false,
    showTodayBtn: true,
    sunHighlight: true,
    satHighlight: false,
    markCurrentDay: true,
    markCurrentMonth: true,
    markCurrentYear: true,
    inline: true,
    selectorHeight: '232px',
    selectorWidth: '252px',
    height: '34px',
    width: '100%',
    componentDisabled: false,
    showClearDateBtn: true,
    openSelectorOnInputClick: true
    // disableSince: {
    //   year: new Date().getFullYear(),
    //   month: new Date().getMonth() + 1,
    //   day: new Date().getDate() + 1
    // }
  };

  
  constructor(private formBuilder: FormBuilder , private http: HttpClient) { }

  ngOnInit() {

  
      this.registrationForm = this.formBuilder.group({
          name: ['', [Validators.required,Validators.minLength(4)]],
          lastName: ['', [Validators.required,Validators.minLength(4)]],
          email:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
         // dob:['',[Validators.required]],
         dob:[null,Validators.required],
          gender:['',[Validators.required]],
          mobile:['',[Validators.required,Validators.minLength(10)]],
          land:['',[Validators.required,Validators.minLength(10)]],
          college:['',[Validators.required]],
          address:['',[Validators.required]],
          state:['',[Validators.required]],
        
        
      })

      this.todaydate1 = moment().format('YYYY-MM-DD');
      

    }


    setDate(): void{
      let date=new Date();
      this.registrationForm.patchValue({dob:{
        date:{
          year: date.getFullYear(),
          month: date.getMonth() +1,
          day: date.getDate()}
         
         } 
         
        }

        
         );


         
        }
       
        clearDate(): void{
          this.registrationForm.patchValue({dob:null});
        }








    onSubmit(formdetails)
    {
      // this.obj=formdetails.value;
      //console.log(this.obj);
      this.arr.push(this.registrationForm.value);
      console.log(this.arr);

      this.http.post('http://localhost:9100/api/data',formdetails)           
  .subscribe((res) => {
    this.data=res;
    console.log(this.data);
  
     }, error => {

    console.log(error);
  });
 




      
      
      // this.arr.push(this.registrationForm);
      // console.log(this.arr);
      // alert(this.arr);

    }
    




  }

  
  



  



