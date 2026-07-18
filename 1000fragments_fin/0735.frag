uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.75) * 0.92;
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.75, 0.71, 0.55);
		q.xy = rot2(1.37 + (time * 0.72) * 0.24) * q.xy;
		q.xz = rot2(0.47) * q.xz;
		q *= 1.34; sc *= 1.34;
	}
	vec3 b = abs(q) - vec3(0.31);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x) - 0.31;
	vec3 ro = vec3(0.0, 0.0, -2.98);
	vec3 rd = normalize(vec3(p, 1.12));
	rd.xy = rot2((time * 0.72) * 0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = hue(tt * 0.22 + (time * 0.72) * 0.21) * fog;
	col += vec3(0.84, 0.38, 0.44) * (it / 60.0) * 0.72;
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.990, 0.985, 0.988);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
