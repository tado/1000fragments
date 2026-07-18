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
	p += vec2(sin((time * 0.62) * 1.06), cos((time * 0.62) * 0.79)) * 0.06;
	vec2 q = p * 2.05 + vec2(2.26, 2.19);
	q += (time * 0.62) * vec2(0.04, -0.04);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 1.15) > 0.78) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 8.69);
	float rr = 0.24 + 0.12 * sin((time * 0.62) * 1.35 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.61 + (time * 0.62) * 0.15, vec3(0.44, 0.41, 0.39), vec3(0.30, 0.32, 0.27), vec3(1.05, 0.97, 0.75), vec3(0.04, 0.27, 0.42));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.440, 0.455, bd);
	col = mix(col, vec3(0.06, 0.11, 0.09), edge * 0.99);
	col = clamp((col - 0.5) * 1.68 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.938, 0.996, 1.033);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
