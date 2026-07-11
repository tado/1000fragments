uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.62) * 1.27;
	vec3 mq = mod(q, 1.71) - 0.86;
	return length(mq) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.86, 0.86, -3.0);
	vec3 rd = normalize(vec3(p, 1.11));
	rd.xy = rot2((time * 0.62) * -0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.15 + (time * 0.62) * 0.13, vec3(0.30, 0.28, 0.24), vec3(0.18, 0.18, 0.20), vec3(0.60, 0.76, 0.66), vec3(0.38, 0.49, 0.91)) * fog;
	col += vec3(0.69, 0.49, 0.62) * (it / 53.0) * 0.54;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.65);
	col = clamp(col, 0.0, 1.0) * vec3(0.961, 0.991, 0.934) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
