import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';
import { RouterLink } from '@angular/router';

interface Folder {
  _id: any;
  name: string;
  short_name: string;
}
@Component({
  selector: 'app-creative-assets',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './creative-assets.component.html',
  styleUrl: './creative-assets.component.css'
})
export class CreativeAssetsAdminComponent {


  creativeAssetFolder: Folder[] = [];
  assetsFolderData: any;

  constructor(private apiService:ApiServiceService){}

  ngOnInit(): void {
   
    this.getProject();
    
  }
  getProject(){
    this.apiService.getProjectListOfCreativeAssets().subscribe(
      (r: any) => {
        this.assetsFolderData = r.data
        this.creativeAssetFolder = r.data;
        console.log('Get employee Project List', this.creativeAssetFolder);
      },
      (e) => {
        console.error(e);
      }
    )
  }




  searchcreativeAsset: string = '';
  creativeAssetPageperPage: number = 12;
  currentcreativeAssetPage: number = 1;
 
  FiltercreativeAsset() {
   this.creativeAssetFolder = this.assetsFolderData.filter((folder: { short_name: string; }) =>
   folder.short_name.toLowerCase().includes(this.searchcreativeAsset.toLowerCase()) 
    );
  }
  

  getPaginatedcreativeAssetData(): any[] {
    const startIndex = (this.currentcreativeAssetPage - 1) * this.creativeAssetPageperPage;
    const endIndex = startIndex + this.creativeAssetPageperPage;
    return this.creativeAssetFolder.slice(startIndex, endIndex);
  }

  previouscreativeAssetPage(): void {
    if (this.currentcreativeAssetPage > 1) {
      this.currentcreativeAssetPage--;
    }
  }

  changePagecreativeAsset(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPagescreativeAsset()) {
      this.currentcreativeAssetPage = pageNumber;
    }
  }
  
  
  nextPagecreativeAsset(): void {
    const totalPages = Math.ceil(
      this.creativeAssetFolder.length / this.creativeAssetPageperPage
    );
    if (this.currentcreativeAssetPage < totalPages) {
      this.currentcreativeAssetPage++;
    }
  }

  getPageNumberscreativeAsset(): number[] {
    const totalPages = Math.ceil(
      this.creativeAssetFolder.length / this.creativeAssetPageperPage
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPagescreativeAsset(): number {
    return Math.ceil(
      this.creativeAssetFolder.length / this.creativeAssetPageperPage
    );
  }
}
