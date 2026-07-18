uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.75) * 0.92;
}

float map(vec3 q){
	q.xz = rot2((time * 0.88) * 0.41) * q.xz;
	q.xy = rot2((time * 0.88) * 0.60) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.80, q.y);
	return length(w) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.88) * 1.13), cos((time * 0.88) * 0.33)) * 0.18;
	vec3 ro = vec3(0.0, 0.0, -3.08);
	vec3 rd = normalize(vec3(p, 1.57));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = hue(tt * 0.14 + (time * 0.88) * 0.00) * fog;
	col += vec3(0.95, 0.88, 0.75) * (it / 57.0) * 0.51;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.980, 1.008, 0.945);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
