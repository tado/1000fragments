uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 1.07;
	vec2 q = p * 1.97 + vec2(1.79, 8.34);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 5.97) > 0.72) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 6.60);
	float rr = 0.33 + 0.06 * sin((time * 0.83) * 0.75 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.44 + (time * 0.83) * 0.17, vec3(0.44, 0.28, 0.19), vec3(0.46, 0.33, 0.19), vec3(1.03, 0.96, 1.04), vec3(0.03, 0.07, 0.18));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.452, 0.467, bd);
	col = mix(col, vec3(0.08, 0.12, 0.11), edge * 0.77);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.025, 1.012, 0.929);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
