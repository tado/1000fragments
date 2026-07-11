uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.32;
	vec3 mq = mod(q, 2.24) - 1.12;
	mq.xy = rot2(time * 1.42) * mq.xy;
	vec3 b = abs(mq) - vec3(0.21);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.12, 1.12, -3.0);
	vec3 rd = normalize(vec3(p, 1.61));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.16 + time * 0.38, vec3(0.47, 0.47, 0.41), vec3(0.36, 0.39, 0.36), vec3(1.20, 0.85, 1.22), vec3(0.25, 0.37, 0.44)) * fog;
	col += vec3(0.59, 0.65, 0.53) * (it / 70.0) * 0.94;
	col = mod(col * 2.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
