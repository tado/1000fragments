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
		q = abs(q) - vec3(0.36, 0.70, 0.40);
		q.xy = rot2(0.91 + time * 0.41) * q.xy;
		q.xz = rot2(0.25) * q.xz;
		q *= 1.49; sc *= 1.49;
	}
	vec3 b = abs(q) - vec3(0.47);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.34);
	vec3 rd = normalize(vec3(p, 1.69));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.26 + time * 0.25, vec3(0.59, 0.58, 0.59), vec3(0.39, 0.42, 0.42), vec3(1.04, 1.22, 1.16), vec3(0.39, 0.35, 0.19)) * fog;
	col += vec3(0.70, 0.96, 0.26) * (it / 57.0) * 0.57;
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
