uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.74;
	vec3 mq = mod(q, 1.61) - 0.80;
	return length(mq) - 0.34;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.80, 0.80, -3.0);
	vec3 rd = normalize(vec3(p, 1.11));
	rd.xy = rot2(time * -0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.26 + time * 0.14, vec3(0.47, 0.46, 0.58), vec3(0.40, 0.43, 0.44), vec3(1.13, 1.30, 0.83), vec3(0.55, 0.18, 0.42)) * fog;
	col += vec3(0.66, 0.31, 0.63) * (it / 71.0) * 0.63;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.03 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
