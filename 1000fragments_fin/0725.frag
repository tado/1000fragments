uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.66) * 1.92;
	vec3 mq = mod(q, 2.07) - 1.04;
	return length(mq) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p.y = abs(p.y);
	vec3 ro = vec3(1.04, 1.04, -3.0);
	vec3 rd = normalize(vec3(p, 0.93));
	rd.xy = rot2((time * 0.66) * 0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.25 + (time * 0.66) * 0.25, vec3(0.49, 0.38, 0.48), vec3(0.34, 0.32, 0.33), vec3(1.05, 1.02, 0.98), vec3(0.81, 0.98, 0.14)) * fog;
	col += vec3(0.78, 0.64, 0.93) * (it / 52.0) * 0.53;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.007, 0.981, 0.955);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
