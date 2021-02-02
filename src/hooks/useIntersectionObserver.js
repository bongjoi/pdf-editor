import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

// 사용자 화면에 보이는 요소인지 아닌지 구별
export const useIntersectionObserver = (props) => {
  const containerRef = useRef(null);
  const { threshold, onVisibilityChanged } = props;

  useIsomorphicLayoutEffect(() => {
    // 관찰자 초기화
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 관찰 대상이 루트 요소와 교차 상태로 들어가거나(true)
          // 교차 상태에서 나가는지(false) 여부를 나타내는 값(Boolean)
          const isVisible = entry.isIntersecting;
          // 관찰 대상이 루트 요소와 얼마나 교차하는지의 수치를 0.0 과 1.0 사이의 숫자로 반환
          const ratio = entry.intersectionRatio;
          onVisibilityChanged({ isVisible, ratio });
        });
      },
      {
        // 옵저버가 실행되기 위해 타겟의 가시성이 얼마나 필요한지 백분율로 표시
        threshold: threshold || 0
      }
    );

    const container = containerRef.current;

    if (!container) return;

    // 관찰할 대상(요소) 등록
    io.observe(container);

    return () => {
      // 대상 요소의 관찰을 중지
      io.unobserve(container);
    };
  }, []);

  return containerRef;
};
