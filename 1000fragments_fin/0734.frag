uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.75) * 0.92;
}

float map(vec3 q){
	q.z += (time * 0.61) * 1.22;
	vec3 mq = mod(q, 2.23) - 1.11;
	return length(mq) - 0.48;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.47;
	vec3 ro = vec3(1.11, 1.11, -3.0);
	vec3 rd = normalize(vec3(p, 1.33));
	rd.xy = rot2((time * 0.61) * -0.05) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = hue(tt * 0.30 + (time * 0.61) * 0.22) * fog;
	col += vec3(0.20, 0.53, 0.30) * (it / 65.0) * 0.39;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.022, 0.956, 1.003);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
