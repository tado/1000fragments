uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.81;
	vec3 mq = mod(q, 2.36) - 1.18;
	mq.xy = rot2(time * 0.97) * mq.xy;
	vec3 b = abs(mq) - vec3(0.24);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.18, 1.18, -3.0);
	vec3 rd = normalize(vec3(p, 1.05));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.29 + time * 0.01, vec3(0.40, 0.59, 0.58), vec3(0.50, 0.42, 0.48), vec3(1.24, 1.16, 1.24), vec3(0.67, 0.59, 0.48)) * fog;
	col += vec3(0.64, 0.99, 0.91) * (it / 59.0) * 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
