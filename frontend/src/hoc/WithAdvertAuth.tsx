import { useAdvertAuth } from '@/hooks';

const WithAdvertAuth = (props: any) => useAdvertAuth() && props.children;

export default WithAdvertAuth;
