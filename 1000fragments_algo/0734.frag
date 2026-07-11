uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.66) * 1.98;
	vec2 g = mod(vec2(q.x, q.z), 2.22) - 1.11;
	float d = length(g) - (0.15 + 0.12 * sin(q.y * 2.71 + (time * 0.66) * 2.70));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.x = abs(p.x) - 0.33;
	vec3 ro = vec3(1.11, 1.11, -3.0);
	vec3 rd = normalize(vec3(p, 1.41));
	rd.xy = rot2((time * 0.66) * -0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.12 + (time * 0.66) * 0.14, vec3(0.31, 0.39, 0.43), vec3(0.17, 0.12, 0.16), vec3(0.85, 0.69, 0.42), vec3(0.19, 0.05, 0.89)) * fog;
	col += vec3(0.62, 0.63, 0.32) * (it / 48.0) * 0.45;
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.970, 0.998) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
