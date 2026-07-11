uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.88;
	vec3 mq = mod(q, 2.10) - 1.05;
	mq.xy = rot2(time * 1.08) * mq.xy;
	vec3 b = abs(mq) - vec3(0.33);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.05, 1.05, -3.0);
	vec3 rd = normalize(vec3(p, 1.23));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.19 + time * 0.36, vec3(0.48, 0.48, 0.60), vec3(0.32, 0.38, 0.37), vec3(1.30, 1.02, 1.17), vec3(0.86, 0.28, 0.02)) * fog;
	col += vec3(0.33, 0.27, 0.95) * (it / 54.0) * 0.61;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
