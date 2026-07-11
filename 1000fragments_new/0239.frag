uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.70;
	vec2 g = mod(vec2(q.x, q.z), 2.56) - 1.28;
	float d = length(g) - (0.23 + 0.12 * sin(q.y * 3.94 + time * 2.70));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.28, 1.28, -3.0);
	vec3 rd = normalize(vec3(p, 1.79));
	rd.xy = rot2(time * 0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.11 + time * 0.38, vec3(0.58, 0.43, 0.44), vec3(0.35, 0.47, 0.47), vec3(1.32, 0.83, 1.08), vec3(0.83, 0.13, 0.03)) * fog;
	col += vec3(0.31, 0.69, 0.96) * (it / 71.0) * 0.55;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
