uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.17 * sin((time * 0.58) * 1.27), -0.06 + 0.21 * cos((time * 0.58) * 0.51));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.06, 0.46)));
	}
	float v = exp(-trap * 2.50);
	float cc = clamp(0.5 + 0.5 * (v * 2.90), 0.0, 1.0);
	vec3 col = mix(vec3(0.918, 0.916, 0.871), vec3(0.072, 0.064, 0.067), smoothstep(0.0, 1.0, cc));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.008, 0.994, 1.009);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
