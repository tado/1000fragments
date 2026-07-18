uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x) - 0.26;
	p = p.yx;
	p *= 1.47;
	p = rot2((time * 0.83) * 0.99) * p;
	vec2 gp = p * 4.52;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 17.06 + rnd * 6.2831853 + (time * 0.83) * 3.44);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.017, 0.027, 0.099), vec3(0.140, 0.396, 0.758), smoothstep(0.0, 0.61, cc)), vec3(0.834, 0.968, 1.000), smoothstep(0.61, 1.0, cc));
	col *= 0.54 + 0.46 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.015, 0.966, 1.017);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
