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
		q = abs(q) - vec3(0.60, 0.77, 0.31);
		q.xy = rot2(1.39 + time * 0.20) * q.xy;
		q.xz = rot2(1.04) * q.xz;
		q *= 1.69; sc *= 1.69;
	}
	vec3 b = abs(q) - vec3(0.50);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.93);
	vec3 rd = normalize(vec3(p, 1.59));
	rd.xy = rot2(time * 0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.25 + time * 0.08, vec3(0.43, 0.52, 0.50), vec3(0.34, 0.36, 0.46), vec3(1.13, 0.84, 1.30), vec3(0.59, 0.62, 0.31)) * fog;
	col += vec3(0.42, 0.66, 0.42) * (it / 53.0) * 0.60;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
