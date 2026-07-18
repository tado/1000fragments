uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.60) * p;
	vec2 q = p * 1.51 + vec2(0.97, 6.52);
	q += (time * 0.78) * vec2(0.04, 0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 2.00) > 0.68) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 7.59);
	float ftn = h;
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.70, 0.68, 0.72) + vec3(0.06, 0.06, 0.06);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.436, 0.451, bd);
	col = mix(col, vec3(0.69, 0.77, 0.78), edge * 0.72);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.031, 0.990, 0.920);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
