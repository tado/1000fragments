uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.60) * 1.07;
	vec2 g = mod(vec2(q.x, q.z), 2.17) - 1.09;
	float d = length(g) - (0.23 + 0.13 * sin(q.y * 3.60 + (time * 0.60) * 1.30));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.46;
	p.y += sin(p.x * 2.20 + (time * 0.60) * 0.75) * 0.12;
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 1.16));
	rd.xy = rot2((time * 0.60) * -0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.32 + (time * 0.60) * 0.04, vec3(0.64, 0.72, 0.81), vec3(0.26, 0.19, 0.20), vec3(0.98, 1.01, 0.96), vec3(0.52, 0.58, 0.64)) * fog;
	col += vec3(0.59, 0.35, 0.93) * (it / 52.0) * 0.85;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.990, 1.007, 0.992);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
