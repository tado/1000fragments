uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.39;
	p *= 1.22;
	vec2 z = p;
	vec2 c = vec2(-0.15 + 0.06 * sin((time * 0.68) * 0.91), -0.48 + 0.11 * cos((time * 0.68) * 1.55));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.84);
	float cc = clamp(0.5 + 0.5 * (v * 3.33), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.016, 0.069, 0.060), vec3(0.359, 0.503, 0.186), smoothstep(0.0, 0.57, cc)), vec3(1.000, 0.901, 0.567), smoothstep(0.57, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.014, 1.001, 0.996);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
