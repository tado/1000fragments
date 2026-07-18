uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.75) * 0.92;
}

float map(vec3 q){
	q.z += (time * 0.79) * 1.42;
	vec2 g = mod(vec2(q.x, q.z), 2.36) - 1.18;
	float d = length(g) - (0.29 + 0.06 * sin(q.y * 3.17 + (time * 0.79) * 1.25));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.18, 1.18, -3.0);
	vec3 rd = normalize(vec3(p, 1.29));
	rd.xy = rot2((time * 0.79) * 0.11) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = hue(tt * 0.10 + (time * 0.79) * 0.21) * fog;
	col += vec3(0.94, 0.37, 0.23) * (it / 61.0) * 0.76;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.028, 0.975, 0.939);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
