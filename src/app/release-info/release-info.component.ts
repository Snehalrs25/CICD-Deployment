import { Component, OnInit } from '@angular/core';
import { ApiIntegratedService } from '../common/services/ApiIntegratedService.service';
import { API_ENDPOINTS } from '../common/constants/api-endpoints.constants';
import { firstValueFrom } from 'rxjs';

interface Release {
  _id: string;
  module_key: string;
  current_version: string;
  upcoming_version: string;
  rollout_percent: number;
  release_notes: string;
  commit_id?: string;
  status: string;
  generated_at: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  releases: Release[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

@Component({
  selector: 'app-release-info',
  templateUrl: './release-info.component.html',
  styleUrls: ['./release-info.component.scss']
})
export class ReleaseInfoComponent implements OnInit {
  releasesData: Release[] = [];
  genderOptions: string[] = [];
  employmentTypeOptions: string[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private apiIntegratedService: ApiIntegratedService) {}

  ngOnInit(): void {
    this.loadReleases();
  }

  /**
   * Load releases from API using ApiIntegratedService
   */
  async loadReleases(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response: ApiResponse = await firstValueFrom(
        this.apiIntegratedService.httpGetCallMethod<ApiResponse>(API_ENDPOINTS.RELEASE_API)
      );
      
      this.isLoading = false;
      // Rule 1&2&4: Add null safety with optional chaining and nullish coalescing
      if (response != null && response !== undefined && response?.releases && response?.releases?.length > 0) {
        this.releasesData = response?.releases ?? [];
        this.processReleaseData(response?.releases ?? []);
      }
    } catch (error) {
      this.isLoading = false;
      this.errorMessage = 'Failed to load releases. Please try again later.';
      console.error('API call failed:', error);
    }
  }

  /**
   * Process release data to extract tab options if needed
   * Based on the requirements for Gender and Employment Type
   */
  private processReleaseData(releases: Release[]): void {
    // Note: The current release-detail.json doesn't contain Gender or Employment Type fields
    // This method is prepared for future enhancement when such fields are added
    releases?.forEach(release => {
      // Check for any fields that might contain tab information
      const releaseData = release as any;
      
      Object.keys(releaseData ?? {}).forEach(key => {
        if (key === 'tab' || (typeof releaseData?.[key] === 'object' && releaseData?.[key]?.['field-label-main'])) {
          const fieldLabel = releaseData?.[key]?.['field-label-main'] ?? '';
          
          if (fieldLabel?.includes('Gender') && releaseData?.[key]?.['tabs-title']) {
            this.genderOptions = [...new Set([...this.genderOptions, ...(releaseData?.[key]?.['tabs-title'] ?? [])])];
          }
          
          if (fieldLabel?.includes('Employment Type') && releaseData?.[key]?.['tabs-title']) {
            this.employmentTypeOptions = [...new Set([...this.employmentTypeOptions, ...(releaseData?.[key]?.['tabs-title'] ?? [])])];
          }
        }
      });
    });
  }

  /**
   * Refresh releases data
   */
  refreshReleases(): void {
    this.loadReleases();
  }

  /**
   * Track by function for ngFor to optimize performance
   */
  trackByReleaseId(index: number, release: Release): string {
    return release?._id ?? '';
  }
}
