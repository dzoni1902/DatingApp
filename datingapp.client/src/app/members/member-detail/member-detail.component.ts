import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user?: User;
  galleryOptions?: any[];
  galleryImages?: any[];
  
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {    //now we get the data before activating the route itself
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        numVisible: 4,
        showThumbnails: true,
        thumbnailHeight: '60px',
        showItemNavigators: true,
        showThumbnailNavigators: true
      }
    ];

    this.galleryImages = this.getImages();
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
}
