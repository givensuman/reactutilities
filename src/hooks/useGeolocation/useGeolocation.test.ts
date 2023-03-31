import { renderHook } from '@testing-library/react-hooks';
import useGeolocation from '.';

describe('useGeolocation', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn()
  };

  beforeAll(() => {
    Object.defineProperty(global.navigator, 'geolocation', {
        value: mockGeolocation,
      });
  });

  afterAll(() => {
    Object.defineProperty(global.navigator, 'geolocation', {
        value: undefined,
      });
  });

  afterEach(() => {
    mockGeolocation.getCurrentPosition.mockReset();
    mockGeolocation.watchPosition.mockReset();
    mockGeolocation.clearWatch.mockReset();
  });

  it('should return an object with null values when geolocation is not supported', () => {
    Object.defineProperty(global.navigator, 'geolocation', {
        value: undefined,
      });
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.error).toBe('Geolocation is not supported');
  });

  it('should return an object with the user location when geolocation is supported', () => {
    const mockPosition = {
      coords: {
        latitude: 12.345,
        longitude: 67.890,
      },
    } as GeolocationPosition;
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) => success(mockPosition));

    const { result } = renderHook(() => useGeolocation());
    expect(result.current.latitude).toBe(12.345);
    expect(result.current.longitude).toBe(67.890);
    expect(result.current.error).toBeNull();
  });

  it('should return an object with null values and an error message when geolocation retrieval fails', () => {
    const mockError = {
      message: 'Geolocation retrieval failed',
    } as GeolocationPositionError;
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success, error) => error(mockError));

    const { result } = renderHook(() => useGeolocation());
    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.error).toBe('Geolocation retrieval failed');
  });
});
