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
	p += vec2(sin((time * 0.69) * 1.13), cos((time * 0.69) * 0.82)) * 0.09;
	p.y += sin(p.x * 2.95 + (time * 0.69) * 1.26) * 0.14;
	p *= 1.09;
	vec2 q = p * 1.72 + vec2(8.20, 2.42);
	q += (time * 0.69) * vec2(0.12, -0.12);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 2.01) > 0.47) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 6.76);
	float ftn = clamp(0.5 + gv.x * -1.49 + gv.y * 0.78, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.97 + (time * 0.69) * 0.08, vec3(0.59, 0.67, 0.77), vec3(0.27, 0.20, 0.20), vec3(0.98, 1.03, 0.96), vec3(0.49, 0.58, 0.66));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.433, 0.448, bd);
	col = mix(col, vec3(0.71, 0.72, 0.81), edge * 0.81);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.043, 0.991, 0.916);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
