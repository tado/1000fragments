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
	p.y = abs(p.y);
	p *= 1.44;
	vec2 q = p * 2.31 + vec2(6.59, 4.98);
	q += (time * 0.59) * vec2(-0.09, -0.02);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 1.76) > 0.75) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.51);
	float ftn = clamp(0.5 + gv.x * -1.34 + gv.y * -1.32, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.99 + (time * 0.59) * 0.03, vec3(0.44, 0.42, 0.34), vec3(0.32, 0.28, 0.27), vec3(0.98, 0.98, 0.70), vec3(-0.00, 0.27, 0.42));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.444, 0.459, bd);
	col = mix(col, vec3(0.16, 0.18, 0.10), edge * 0.72);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.933, 0.998, 1.053);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
