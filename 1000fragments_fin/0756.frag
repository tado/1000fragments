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
		q = abs(q) - vec3(0.47, 0.67, 0.65);
		q.xy = rot2(1.07 + (time * 0.77) * 0.28) * q.xy;
		q.xz = rot2(1.39) * q.xz;
		q *= 1.52; sc *= 1.52;
	}
	vec3 b = abs(q) - vec3(0.40);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x += p.y * 0.65;
	p.y = abs(p.y);
	vec3 ro = vec3(0.0, 0.0, -2.85);
	vec3 rd = normalize(vec3(p, 1.44));
	rd.xy = rot2((time * 0.77) * -0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = hue(tt * 0.16 + (time * 0.77) * 0.19) * fog;
	col += vec3(0.45, 0.66, 0.69) * (it / 51.0) * 0.53;
	col = clamp((col - 0.5) * 1.51 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.007, 0.974, 0.956);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
