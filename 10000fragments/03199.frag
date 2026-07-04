uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.96;
	vec3 mq = mod(q, 2.17) - 1.08;
	return length(mq) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.08, 1.08, -3.0);
	vec3 rd = normalize(vec3(p, 1.76));
	rd.xy = rot2(time * 0.33) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.25 + time * 0.37, vec3(0.44, 0.40, 0.57), vec3(0.38, 0.35, 0.47), vec3(0.80, 1.10, 0.89), vec3(0.72, 0.33, 0.89)) * fog;
	col += vec3(0.25, 0.98, 0.30) * (it / 69.0) * 0.65;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
