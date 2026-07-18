uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	p = rot2(0.33) * p;
	vec2 q = p * 2.56 + vec2(4.40, 4.75);
	q += (time * 0.81) * vec2(0.09, 0.11);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 1.70) > 0.45) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 1.20);
	float ftn = h;
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.061, 0.105, 0.060), vec3(0.845, 0.935, 0.658), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.411, 0.426, bd);
	col = mix(col, vec3(0.04, 0.06, 0.10), edge * 0.85);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.002, 0.957, 1.006);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
