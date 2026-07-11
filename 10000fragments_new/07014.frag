uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.22;
	vec3 mq = mod(q, 2.51) - 1.26;
	return length(mq) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.26, 1.26, -3.0);
	vec3 rd = normalize(vec3(p, 1.22));
	rd.xy = rot2(time * 0.28) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.12 + time * 0.14, vec3(0.44, 0.52, 0.49), vec3(0.39, 0.46, 0.48), vec3(1.22, 1.30, 1.29), vec3(0.33, 0.15, 0.90)) * fog;
	col += vec3(0.97, 0.59, 0.65) * (it / 49.0) * 0.37;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
