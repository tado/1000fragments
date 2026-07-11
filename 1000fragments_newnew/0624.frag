uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.50) * 0.85;
}

float map(vec3 q){
	q.xz = rot2((time * 0.56) * 0.95) * q.xz;
	q.xy = rot2((time * 0.56) * 0.78) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.03, q.y);
	return length(w) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.74);
	vec3 rd = normalize(vec3(p, 1.71));
	rd.xy = rot2((time * 0.56) * 0.19) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = hue(tt * 0.22 + (time * 0.56) * 0.24) * fog;
	col += vec3(0.41, 0.85, 0.64) * (it / 72.0) * 0.75;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 1.006, 1.015) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
