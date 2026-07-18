uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p.y += sin(p.x * 1.77 + (time * 0.67) * 0.41) * 0.19;
	p *= 1.69;
	p = rot2((time * 0.67) * -0.68) * p;
	vec2 gp = p * 2.56;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.27 - 0.09 * sin((time * 0.67) * 5.22 + rnd * 6.2831853)) * 11.84);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.917, 0.887, 0.789), vec3(0.210, 0.236, 0.457), smoothstep(0.0, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.73));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.019, 0.958, 1.008);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
