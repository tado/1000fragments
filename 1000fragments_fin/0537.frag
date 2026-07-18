uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	p = rot2(1.87) * p;
	vec2 q = p * 3.30 + vec2(7.11, 6.71);
	q += (time * 0.62) * vec2(0.09, 0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 2.44) > 0.74) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 4.60);
	float ftn = 0.5 + 0.5 * sin((time * 0.62) * 0.81 + h * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.64, 0.66, 0.66) + vec3(0.08, 0.03, 0.05);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.424, 0.439, bd);
	col = mix(col, vec3(0.03, 0.06, 0.05), edge * 0.86);
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(0.987, 1.024, 0.944);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
