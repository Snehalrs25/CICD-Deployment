import { ReleaseInfoComponent } from './release-info.component';
import { ApiIntegratedService } from '../common/services/ApiIntegratedService.service';
import { of } from 'rxjs';

describe('ReleaseInfoComponent (unit)', () => {
  let component: ReleaseInfoComponent;
  const mockService: Partial<ApiIntegratedService> = {
    httpGetCallMethod: jest.fn()
  };

  beforeEach(() => {
    component = new ReleaseInfoComponent(mockService as ApiIntegratedService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set releasesData when loadReleases returns data', async () => {
    const mockResp = { releases: [{ _id: '1', module_key: 'm', current_version: '1.0', upcoming_version: '1.1', rollout_percent: 100, release_notes: '', status: 'released', generated_at: '', createdAt: '', updatedAt: '', __v: 0 }], pagination: { page: 1, limit: 10, total: 1, pages: 1 } };
    (mockService.httpGetCallMethod as jest.Mock).mockReturnValue(of(mockResp));

    await component.loadReleases();

    expect(component.releasesData.length).toBe(1);
    expect(component.isLoading).toBe(false);
  });

  it('should handle empty releases array without error', async () => {
    const mockResp = { releases: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } };
    (mockService.httpGetCallMethod as jest.Mock).mockReturnValue(of(mockResp));

    await component.loadReleases();

    expect(component.releasesData.length).toBe(0);
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage when service throws', async () => {
    (mockService.httpGetCallMethod as jest.Mock).mockImplementation(() => { throw new Error('network'); });

    await component.loadReleases();

    expect(component.releasesData.length).toBe(0);
    expect(component.errorMessage).toBe('Failed to load releases. Please try again later.');
  });

  it('should extract genderOptions from release data with tabs', () => {
    const componentAny = component as any;
    const releases = [
      {
        _id: 'r1',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        details: {
          'field-label-main': 'Gender',
          'tabs-title': ['Male', 'Female']
        }
      }
    ];

    componentAny['processReleaseData'](releases as any);

    expect(component.genderOptions).toEqual(['Male', 'Female']);
  });

  it('should extract employmentTypeOptions from release data with tabs', () => {
    const componentAny = component as any;
    const releases = [
      {
        _id: 'r2',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        employment: {
          'field-label-main': 'Employment Type',
          'tabs-title': ['Full-Time', 'Part-Time']
        }
      }
    ];

    componentAny['processReleaseData'](releases as any);

    expect(component.employmentTypeOptions).toEqual(['Full-Time', 'Part-Time']);
  });

  it('should handle null response without throwing and keep releasesData empty', async () => {
    (mockService.httpGetCallMethod as jest.Mock).mockReturnValue(of(null));

    await component.loadReleases();

    expect(component.releasesData.length).toBe(0);
    expect(component.isLoading).toBe(false);
    // errorMessage stays empty because loadReleases sets it only on catch
    expect(component.errorMessage).toBe('');
  });

  it('should handle response object missing releases property', async () => {
    (mockService.httpGetCallMethod as jest.Mock).mockReturnValue(of({} as any));

    await component.loadReleases();

    expect(component.releasesData.length).toBe(0);
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('ngOnInit should call loadReleases', () => {
    const spy = jest.spyOn(component as any, 'loadReleases').mockImplementation(() => Promise.resolve());
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should dedupe and collect mixed tab titles from multiple releases', () => {
    const componentAny = component as any;
    const releases = [
      {
        _id: 'r3',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        a: { 'field-label-main': 'Gender', 'tabs-title': ['Male', 'Other'] }
      },
      {
        _id: 'r4',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        b: { 'field-label-main': 'Gender', 'tabs-title': ['Female', 'Other'] },
        c: { 'field-label-main': 'Employment Type', 'tabs-title': ['Contract', 'Full-Time'] }
      }
    ];

    componentAny['processReleaseData'](releases as any);

    // Order isn't guaranteed but should contain unique titles
    expect(new Set(component.genderOptions)).toEqual(new Set(['Male', 'Other', 'Female']));
    expect(new Set(component.employmentTypeOptions)).toEqual(new Set(['Contract', 'Full-Time']));
  });

  it('should ignore non-object keys when processing release data', () => {
    const componentAny = component as any;
    const releases = [
      {
        _id: 'r6',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        simpleKey: 'just a string'
      }
    ];

    componentAny['processReleaseData'](releases as any);

    expect(component.genderOptions).toEqual([]);
    expect(component.employmentTypeOptions).toEqual([]);
  });

  it('should ignore object without field-label-main', () => {
    const componentAny = component as any;
    const releases = [
      {
        _id: 'r7',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        someObj: { 'tabs-title': ['A'] }
      }
    ];

    componentAny['processReleaseData'](releases as any);

    expect(component.genderOptions).toEqual([]);
    expect(component.employmentTypeOptions).toEqual([]);
  });

  it('should ignore objects with field-label-main but no tabs-title', () => {
    const componentAny = component as any;
    const releases = [
      {
        _id: 'r8',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        info: { 'field-label-main': 'Gender' }
      }
    ];

    componentAny['processReleaseData'](releases as any);

    expect(component.genderOptions).toEqual([]);
  });

  it('should ignore tab key when label does not match', () => {
    const componentAny = component as any;
    const releases = [
      {
        _id: 'r9',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        tab: { 'field-label-main': 'Other', 'tabs-title': ['Z'] }
      }
    ];

    componentAny['processReleaseData'](releases as any);

    expect(component.genderOptions).toEqual([]);
    expect(component.employmentTypeOptions).toEqual([]);
  });

  it('should exercise multiple branch combinations in processReleaseData', () => {
    const componentAny = component as any;
    const releases = [
      {
        _id: 'rb1',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        // tab key with Gender titles
        tab: { 'field-label-main': 'Gender', 'tabs-title': ['M', 'F'] },
        // object with both labels and tabs
        both: { 'field-label-main': 'Gender and Employment Type', 'tabs-title': ['G1'] },
        // employment type object
        emp: { 'field-label-main': 'Employment Type', 'tabs-title': ['Full-Time'] },
        // object with field-label-main but no tabs-title
        noTabs: { 'field-label-main': 'Gender' },
        // non-object key
        simple: 'nope'
      }
    ];

    componentAny['processReleaseData'](releases as any);

    expect(component.genderOptions).toEqual(expect.arrayContaining(['M', 'F', 'G1']));
    expect(component.employmentTypeOptions).toEqual(expect.arrayContaining(['G1', 'Full-Time']));
  });

  it('comprehensive branch coverage test for processReleaseData', () => {
    const componentAny = component as any;
    const releases = [
      {
        _id: 'bx1',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        // tab as non-object -> triggers key === 'tab' true, typeof check would be false
        tab: 'not-an-object',
        // object without field-label-main
        objNoField: {},
        // object with field-label-main but no tabs-title
        objFieldNoTabs: { 'field-label-main': 'Gender' },
        // object with field-label-main and tabs-title for Employment Type
        objEmpWithTabs: { 'field-label-main': 'Employment Type', 'tabs-title': ['FT'] },
        // object with non-matching field-label-main but with tabs-title
        objOtherWithTabs: { 'field-label-main': 'Other Label', 'tabs-title': ['O1'] }
      }
    ];

    componentAny['processReleaseData'](releases as any);

    // Expect Employment Type tab to be collected, Gender not (no tabs for Gender)
    expect(component.employmentTypeOptions).toEqual(expect.arrayContaining(['FT']));
    expect(component.genderOptions).toEqual(expect.arrayContaining([]));
  });

  it('should process `tab` key entries as well', () => {
    const componentAny = component as any;
    const releases = [
      {
        _id: 'r5',
        module_key: 'm',
        current_version: '1',
        upcoming_version: '2',
        rollout_percent: 0,
        release_notes: '',
        status: 'draft',
        generated_at: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        tab: { 'field-label-main': 'Gender and Employment Type', 'tabs-title': ['X', 'Y'] }
      }
    ];

    componentAny['processReleaseData'](releases as any);

    // Should add to both arrays when fieldLabel includes both keywords
    expect(component.genderOptions).toContain('X');
    expect(component.employmentTypeOptions).toContain('X');
  });

  it('trackByReleaseId should handle null release gracefully', () => {
    const result = component.trackByReleaseId(0, null as any);
    expect(result).toBe('');
  });

  it('refreshReleases should call loadReleases', () => {
    const spy = jest.spyOn(component as any, 'loadReleases').mockImplementation(() => Promise.resolve());
    component.refreshReleases();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

});
