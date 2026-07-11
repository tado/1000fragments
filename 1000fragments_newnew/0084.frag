uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.50) * 0.85;
}

float map(vec3 q){
	q.xz = rot2((time * 0.77) * 1.41) * q.xz;
	q.xy = rot2((time * 0.77) * 0.88) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.98, q.y);
	return length(w) - 0.22;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.15);
	vec3 rd = normalize(vec3(p, 1.38));
	rd.xy = rot2((time * 0.77) * -0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = hue(tt * 0.27 + (time * 0.77) * 0.21) * fog;
	col += vec3(0.60, 0.84, 0.71) * (it / 54.0) * 0.88;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(1.044, 0.975, 0.931) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
