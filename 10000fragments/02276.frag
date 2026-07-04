uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.91;
	float g = dot(sin(q * 1.88), cos(q.zxy * 1.88));
	return (abs(g) - 0.51) / (1.88 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.52);
	vec3 rd = normalize(vec3(p, 1.57));
	rd.xy = rot2(time * 0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.11 + time * 0.18, vec3(0.44, 0.43, 0.54), vec3(0.34, 0.35, 0.38), vec3(1.07, 1.31, 1.37), vec3(0.22, 0.07, 0.93)) * fog;
	col += vec3(0.23, 0.74, 0.99) * (it / 48.0) * 0.83;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
