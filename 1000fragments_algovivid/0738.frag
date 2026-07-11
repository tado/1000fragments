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
		q = abs(q) - vec3(0.72, 0.47, 0.57);
		q.xy = rot2(0.27 + (time * 0.51) * 0.31) * q.xy;
		q.xz = rot2(0.27) * q.xz;
		q *= 1.42; sc *= 1.42;
	}
	vec3 b = abs(q) - vec3(0.48);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.93);
	vec3 rd = normalize(vec3(p, 1.34));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.25 + (time * 0.51) * 0.30, vec3(0.42, 0.44, 0.39), vec3(0.16, 0.21, 0.21), vec3(0.86, 0.54, 0.86), vec3(0.60, 0.79, 0.57)) * fog;
	col += vec3(0.58, 0.88, 0.25) * (it / 72.0) * 0.48;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 1.003, 0.990) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
