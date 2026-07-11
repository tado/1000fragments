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
		q = abs(q) - vec3(0.69, 0.55, 0.35);
		q.xy = rot2(0.67 + time * 0.13) * q.xy;
		q.xz = rot2(1.42) * q.xz;
		q *= 1.38; sc *= 1.38;
	}
	vec3 b = abs(q) - vec3(0.31);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.41);
	vec3 rd = normalize(vec3(p, 1.68));
	rd.xy = rot2(time * 0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.32 + time * 0.26, vec3(0.41, 0.51, 0.49), vec3(0.45, 0.47, 0.50), vec3(0.97, 0.93, 1.27), vec3(0.21, 0.60, 0.88)) * fog;
	col += vec3(0.46, 0.96, 0.88) * (it / 61.0) * 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
