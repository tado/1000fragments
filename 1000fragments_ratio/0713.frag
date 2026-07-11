uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.80) * 0.95;
}

float map(vec3 q){
	q.xz = rot2((time * 0.66) * 0.43) * q.xz;
	q.xy = rot2((time * 0.66) * 0.84) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.21, q.y);
	return length(w) - 0.32;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec3 ro = vec3(0.0, 0.0, -3.27);
	vec3 rd = normalize(vec3(p, 1.79));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = hue(tt * 0.28 + (time * 0.66) * 0.18) * fog;
	col += vec3(0.22, 0.83, 0.53) * (it / 63.0) * 0.85;
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 0.85 + (time * 0.66) * 5.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(0.955, 1.013, 0.942) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
