import { renderHook, act } from '@testing-library/react-hooks';
import useSpeechRecognition from '.';

// Mock SpeechRecognition API
window.SpeechRecognition = jest.fn().mockImplementation(() => {
  return {
    start: jest.fn(),
    stop: jest.fn(),
    addEventListener: jest.fn(),
  };
});

describe('useSpeechRecognition', () => {
  test('returns initial values', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    expect(result.current.isListening).toBe(false);
    expect(result.current.transcript).toBe('');
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe('');
  });

  test('sets isListening to true when startListening is called', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening();
    });

    expect(result.current.isListening).toBe(true);
  });

  test('sets isListening to false when stopListening is called', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    act(() => {
      result.current.startListening();
      result.current.stopListening();
    });

    expect(result.current.isListening).toBe(false);
  });

  test('sets transcript when recognition occurs', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const mockTranscript = 'hello world';

    act(() => {
      const event = new Event('result');
      // @ts-ignore
      event.results = [{ transcript: mockTranscript }];
      // @ts-ignore
      result.current.recognition.onresult(event);
    });

    expect(result.current.transcript).toBe(mockTranscript);
  });

  test('sets isError and errorMessage when recognition errors occur', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    const mockErrorMessage = 'An error occurred';

    act(() => {
      const event = new Event('error');
      // @ts-ignore
      event.error = mockErrorMessage;
      // @ts-ignore
      result.current.recognition.onerror(event);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(mockErrorMessage);
  });
});
