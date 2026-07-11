uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.80) * 0.95;
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.70, 0.31, 0.69);
		q.xy = rot2(1.35 + (time * 0.73) * 0.43) * q.xy;
		q.xz = rot2(0.61) * q.xz;
		q *= 1.53; sc *= 1.53;
	}
	vec3 b = abs(q) - vec3(0.43);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x = abs(p.x);
	p.y = abs(p.y) - 0.49;
	vec3 ro = vec3(0.0, 0.0, -3.11);
	vec3 rd = normalize(vec3(p, 1.18));
	rd.xy = rot2((time * 0.73) * 0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = hue(tt * 0.22 + (time * 0.73) * 0.06) * fog;
	col += vec3(0.28, 0.71, 0.84) * (it / 52.0) * 0.95;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.73)) * 100.0) - 0.5) * 0.09;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.984, 1.000) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
