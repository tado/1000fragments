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
	p *= 1.45;
	p.x += p.y * 0.23;
	vec2 q = p * 2.53 + vec2(3.10, 0.89);
	q += (time * 0.81) * vec2(0.09, -0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 6.06) > 0.49) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.63);
	float ftn = clamp(0.5 + gv.x * -1.41 + gv.y * -0.56, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 1.08 + (time * 0.81) * 0.03, vec3(0.48, 0.42, 0.37), vec3(0.42, 0.35, 0.35), vec3(0.96, 1.01, 0.96), vec3(0.06, 0.34, 0.52));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.424, 0.439, bd);
	col = mix(col, vec3(0.61, 0.69, 0.63), edge * 0.92);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.020, 0.954, 1.010);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
