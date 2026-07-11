uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.84) * 0.98;
	vec2 g = mod(vec2(q.x, q.z), 1.87) - 0.93;
	float d = length(g) - (0.28 + 0.12 * sin(q.y * 3.16 + (time * 0.84) * 3.78));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.93 + (time * 0.84) * 0.96) * 0.16;
	vec3 ro = vec3(0.93, 0.93, -3.0);
	vec3 rd = normalize(vec3(p, 1.14));
	rd.xy = rot2((time * 0.84) * 0.17) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.15 + (time * 0.84) * 0.32, vec3(0.35, 0.26, 0.28), vec3(0.16, 0.12, 0.14), vec3(0.54, 0.78, 0.66), vec3(0.52, 0.56, 0.84)) * fog;
	col += vec3(0.88, 0.44, 0.25) * (it / 64.0) * 0.75;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(1.008, 0.992, 0.987) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
