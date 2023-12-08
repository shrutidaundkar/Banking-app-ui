import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/userServices/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string | undefined;
  imageName: any;
  selectedFile: any;

  constructor(
    private profileService: ProfileService,
    private httpClient: HttpClient,
    private readonly notificationService : NotificationService
  ) {}

  ngOnInit(): void {
    const userId: number = Number(localStorage.getItem('userId'));
    this.profileService.getUserProfile(userId).subscribe(
      (response) => {
        this.user = response;
        console.log(this.user);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append(
      'imageFile',
      this.selectedFile,
      this.selectedFile.name
    );
    const userId: number = Number(localStorage.getItem('userId'));
    //Make a call to the Spring Boot Application to save the image
    this.httpClient
      .post(
        `http://localhost:8080/server/uploadFile/${userId}`,
        uploadImageData,
        {
          observe: 'response',
        }
      )
      .subscribe((response) => {
        if (response.status === 200) {
          this.notificationService.createNotification(
                    'success',
                    'Success',
                    'Image Uploaded Successfully!'
                  );
          this.message = 'Image uploaded successfully';
        } else {
          this.notificationService.createNotification(
                    'error',
                    'Error',
                    'Error Occured!'
                  );
          this.message = 'Image not uploaded successfully';
        }
      });
  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    const userId: number = Number(localStorage.getItem('userId'));
    //Make a call to Sprinf Boot to get the Image Bytes.

    this.profileService.getUserFile(userId).subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);

        window.open(fileURL);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = 'document.pdf';
        document.body.appendChild(a);
        a.click();
      },
      (error) => {
        console.log('getPDF error: ', error);
      }
    );
  }
}
