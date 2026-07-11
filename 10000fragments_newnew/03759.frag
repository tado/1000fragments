uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.75, 0.59, 0.78);
		q.xy = rot2(0.45 + time * 0.42) * q.xy;
		q.xz = rot2(0.79) * q.xz;
		q *= 1.54; sc *= 1.54;
	}
	vec3 b = abs(q) - vec3(0.48);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.08);
	vec3 rd = normalize(vec3(p, 1.19));
	rd.xy = rot2(time * 0.28) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.21 + time * 0.30, vec3(0.43, 0.42, 0.56), vec3(0.42, 0.37, 0.45), vec3(1.29, 0.97, 1.33), vec3(0.08, 0.52, 0.39)) * fog;
	col += vec3(0.39, 0.72, 0.26) * (it / 55.0) * 0.99;
	col *= 0.86 + 0.17 * sin(gl_FragCoord.y * 1.61 + time * 5.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
