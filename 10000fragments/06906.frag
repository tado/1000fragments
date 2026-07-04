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
		q = abs(q) - vec3(0.74, 0.73, 0.62);
		q.xy = rot2(0.23 + time * 0.47) * q.xy;
		q.xz = rot2(1.10) * q.xz;
		q *= 1.46; sc *= 1.46;
	}
	vec3 b = abs(q) - vec3(0.42);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.77);
	vec3 rd = normalize(vec3(p, 1.08));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.10 + time * 0.36, vec3(0.52, 0.53, 0.41), vec3(0.49, 0.50, 0.40), vec3(1.14, 1.23, 1.35), vec3(0.05, 0.23, 0.62)) * fog;
	col += vec3(0.24, 0.34, 0.54) * (it / 62.0) * 0.98;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
