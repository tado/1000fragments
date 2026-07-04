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
		q = abs(q) - vec3(0.66, 0.55, 0.64);
		q.xy = rot2(0.95 + time * 0.21) * q.xy;
		q.xz = rot2(0.45) * q.xz;
		q *= 1.42; sc *= 1.42;
	}
	vec3 b = abs(q) - vec3(0.49);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.62);
	vec3 rd = normalize(vec3(p, 1.70));
	rd.xy = rot2(time * -0.33) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.25 + time * 0.32, vec3(0.44, 0.44, 0.52), vec3(0.31, 0.38, 0.34), vec3(0.77, 0.88, 0.93), vec3(0.71, 0.24, 0.71)) * fog;
	col += vec3(0.22, 0.86, 0.82) * (it / 56.0) * 0.54;
	col = fract(col * 1.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
