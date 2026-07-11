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
		q = abs(q) - vec3(0.62, 0.74, 0.63);
		q.xy = rot2(0.74 + time * 0.40) * q.xy;
		q.xz = rot2(0.71) * q.xz;
		q *= 1.65; sc *= 1.65;
	}
	vec3 b = abs(q) - vec3(0.32);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.99);
	vec3 rd = normalize(vec3(p, 1.16));
	rd.xy = rot2(time * 0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.12 + time * 0.02, vec3(0.47, 0.43, 0.52), vec3(0.47, 0.33, 0.50), vec3(1.28, 0.76, 0.73), vec3(0.78, 0.51, 0.26)) * fog;
	col += vec3(0.33, 0.65, 0.32) * (it / 65.0) * 0.47;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
