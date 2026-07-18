uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.71;
	p = p.yx;
	p *= 1.33;
	vec2 z = p;
	vec2 c = vec2(-0.45 + 0.07 * sin((time * 0.92) * 1.16), -0.13 + 0.16 * cos((time * 0.92) * 0.79));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.02);
	float cc = clamp(0.5 + 0.5 * (v * 2.25), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.051, 0.093, 0.055), vec3(0.372, 0.501, 0.189), smoothstep(0.0, 0.44, cc)), vec3(1.000, 0.899, 0.540), smoothstep(0.44, 1.0, cc));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.021, 0.982, 0.954);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
