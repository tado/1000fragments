uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.xz = rot2((time * 0.66) * 1.39) * q.xz;
	q.xy = rot2((time * 0.66) * 0.91) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.93, q.y);
	return length(w) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.66) * 0.52), cos((time * 0.66) * 1.16)) * 0.06;
	p.x = abs(p.x) - 0.23;
	vec3 ro = vec3(0.0, 0.0, -3.06);
	vec3 rd = normalize(vec3(p, 0.90));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.19 + (time * 0.66) * 0.30, vec3(0.40, 0.32, 0.40), vec3(0.18, 0.10, 0.15), vec3(0.69, 0.64, 0.50), vec3(0.57, 0.37, 0.35)) * fog;
	col += vec3(1.00, 0.82, 0.98) * (it / 65.0) * 0.77;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.972, 1.022, 0.933) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
