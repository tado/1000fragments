uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.41, 0.49, 0.61);
		q.xy = rot2(1.30 + (time * 0.54) * 0.46) * q.xy;
		q.xz = rot2(0.66) * q.xz;
		q *= 1.62; sc *= 1.62;
	}
	vec3 b = abs(q) - vec3(0.54);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.50;
	vec3 ro = vec3(0.0, 0.0, -3.25);
	vec3 rd = normalize(vec3(p, 1.57));
	rd.xy = rot2((time * 0.54) * -0.33) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.16 + (time * 0.54) * 0.24, vec3(0.46, 0.42, 0.44), vec3(0.13, 0.10, 0.08), vec3(0.76, 0.78, 0.46), vec3(0.51, 0.70, 0.53)) * fog;
	col += vec3(0.38, 0.42, 0.97) * (it / 64.0) * 0.65;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(0.926, 0.984, 1.029) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
