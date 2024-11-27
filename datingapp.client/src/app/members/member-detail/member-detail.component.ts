import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('memberTabs', { static: false }) memberTabs?: TabsetComponent;
  user?: User;
  galleryOptions?: any[];
  galleryImages?: any[];
  
  constructor(private userService: UserService, private alertify: AlertifyService, 
              private route: ActivatedRoute, private cdRef: ChangeDetectorRef, 
              private authService: AuthService) { }

  ngOnInit() {    //now we get the data before activating the route itself
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        numVisible: 5,
        showThumbnails: false,
        thumbnailHeight: '60px',
        showItemNavigators: true,
        showThumbnailNavigators: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  ngAfterViewInit() { 
    this.route.queryParams.subscribe(params => { 
      const selectedTab = params['tab']; 
        if (this.memberTabs) { 
          this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true; 
          this.cdRef.detectChanges(); // Manually trigger change detection
        } 
      }); 
    }

  getImages() {
    const imageUrls = [];
    if (this.user?.photos?.length) {
      for (let i = 0; i < this.user.photos.length; i++) {
        imageUrls.push({
          itemImageSrc: this.user.photos[i].url,
          thumbnailImageSrc: this.user.photos[i].url,
          alt: this.user.photos[i].description,
          title: this.user.photos[i].description
        });
      }
    }
    return imageUrls;
  }

  selectTab(tabId: number) {
    if (this.memberTabs?.tabs[tabId]) {
      this.memberTabs.tabs[tabId].active = true;
      this.cdRef.detectChanges(); 
    }
  }

  sendLike(recipientId: number) {
    if (recipientId !== undefined) {
        this.userService.sendLike(this.authService.decodedToken.nameid, recipientId).subscribe(
            data => {
                this.alertify.success('You have liked: ' + this.user?.knownAs);
            },
            error => {
              const errorMessage = error.message || 'An error occurred'; 
              this.alertify.error(errorMessage);
            }
        );
    } else {
        this.alertify.error('User ID is undefined.');
    }
  }
}
