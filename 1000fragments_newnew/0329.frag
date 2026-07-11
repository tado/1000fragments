uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.xz = rot2((time * 0.80) * 0.59) * q.xz;
	q.xy = rot2((time * 0.80) * 0.52) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.00, q.y);
	return length(w) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.40);
	vec3 rd = normalize(vec3(p, 1.72));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.35 + (time * 0.80) * 0.22, vec3(0.52, 0.49, 0.51), vec3(0.08, 0.09, 0.13), vec3(0.40, 0.54, 0.89), vec3(0.60, 0.86, 0.99)) * fog;
	col += vec3(0.49, 0.44, 0.63) * (it / 64.0) * 0.89;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.97 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 1.004, 1.012) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
