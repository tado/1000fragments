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
		q = abs(q) - vec3(0.32, 0.45, 0.33);
		q.xy = rot2(1.44 + (time * 0.57) * 0.29) * q.xy;
		q.xz = rot2(1.47) * q.xz;
		q *= 1.54; sc *= 1.54;
	}
	vec3 b = abs(q) - vec3(0.51);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.86);
	vec3 rd = normalize(vec3(p, 1.54));
	rd.xy = rot2((time * 0.57) * -0.18) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.24 + (time * 0.57) * 0.08, vec3(0.32, 0.29, 0.34), vec3(0.31, 0.24, 0.29), vec3(0.77, 0.57, 0.41), vec3(0.13, 0.43, 0.34)) * fog;
	col += vec3(0.89, 0.22, 0.66) * (it / 60.0) * 0.71;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.017, 0.994, 0.981) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
