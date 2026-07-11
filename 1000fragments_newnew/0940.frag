uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.59, 0.69, 0.62);
		q.xy = rot2(1.20 + (time * 0.64) * 0.15) * q.xy;
		q.xz = rot2(0.61) * q.xz;
		q *= 1.44; sc *= 1.44;
	}
	vec3 b = abs(q) - vec3(0.42);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.52);
	vec3 rd = normalize(vec3(p, 1.37));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.38 + (time * 0.64) * 0.15, vec3(0.48, 0.42, 0.51), vec3(0.26, 0.31, 0.23), vec3(0.69, 0.64, 0.46), vec3(0.99, 0.24, 0.17)) * fog;
	col += vec3(0.68, 0.73, 0.44) * (it / 60.0) * 0.91;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 0.983, 0.981) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
