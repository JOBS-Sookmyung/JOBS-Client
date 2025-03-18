const handleEndInterview = async () => {
    try {
        const response = await fetch(`${API_URL}/chat/end-interview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: sessionToken }),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('세션 종료에 실패했습니다.');
        }

        const sessionInfo = await response.json();
        console.log('📊 세션 정보:', sessionInfo);
        
        // 세션 종료 후 SubHome으로 이동
        window.location.href = '/subhome';
    } catch (error) {
        console.error('세션 종료 중 오류:', error);
        alert('세션 종료 중 오류가 발생했습니다.');
    }
}; 