uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.47;
	p *= 1.55;
	p = rot2((time * 0.59) * 0.84) * p;
	vec2 z = p;
	vec2 c = vec2(-0.25 + 0.25 * sin((time * 0.59) * 0.72), -0.34 + 0.22 * cos((time * 0.59) * 0.50));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.15, -0.47)));
	}
	float v = exp(-trap * 4.58);
	float cc = clamp(0.5 + 0.5 * (v * 3.32), 0.0, 1.0);
	vec3 col = mix(vec3(0.146, 0.066, 0.084), vec3(0.955, 0.745, 0.732), smoothstep(0.0, 1.0, cc));
	col *= 0.80 + 0.10 * sin(gl_FragCoord.y * 1.47 + (time * 0.59) * 6.17);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(0.948, 0.995, 1.053);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
