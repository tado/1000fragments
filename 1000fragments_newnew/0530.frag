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
		q = abs(q) - vec3(0.36, 0.47, 0.67);
		q.xy = rot2(1.32 + (time * 0.84) * 0.26) * q.xy;
		q.xz = rot2(1.10) * q.xz;
		q *= 1.45; sc *= 1.45;
	}
	vec3 b = abs(q) - vec3(0.58);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.14);
	vec3 rd = normalize(vec3(p, 1.36));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.23 + (time * 0.84) * 0.21, vec3(0.41, 0.51, 0.40), vec3(0.20, 0.17, 0.20), vec3(0.65, 0.49, 0.75), vec3(0.15, 0.25, 0.90)) * fog;
	col += vec3(0.37, 0.21, 0.76) * (it / 51.0) * 0.56;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.048, 0.985, 0.942) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
