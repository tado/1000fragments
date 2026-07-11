uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.04;
	vec3 mq = mod(q, 2.58) - 1.29;
	mq.xy = rot2(time * -0.79) * mq.xy;
	vec3 b = abs(mq) - vec3(0.34);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.29, 1.29, -3.0);
	vec3 rd = normalize(vec3(p, 1.33));
	rd.xy = rot2(time * -0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.90;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.23 + time * 0.08, vec3(0.41, 0.40, 0.49), vec3(0.40, 0.43, 0.33), vec3(1.27, 0.73, 1.12), vec3(0.78, 0.41, 0.05)) * fog;
	col += vec3(0.80, 0.34, 0.63) * (it / 57.0) * 0.90;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
