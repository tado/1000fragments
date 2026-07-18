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
	p *= 1.39;
	p = rot2(3.08) * p;
	vec2 q = p * 2.79 + vec2(5.83, 6.51);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 2.62) > 0.73) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.47);
	float ftn = h;
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.023, 0.081, 0.116), vec3(0.112, 0.425, 0.519), smoothstep(0.0, 0.58, cc)), vec3(1.000, 0.821, 0.466), smoothstep(0.58, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.446, 0.461, bd);
	col = mix(col, vec3(0.01, 0.03, 0.08), edge * 0.94);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.942, 0.998, 1.051);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
