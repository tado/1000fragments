uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 1.82;
	vec2 z = p;
	vec2 c = vec2(-0.16 + 0.27 * sin((time * 0.92) * 0.99), 0.28 + 0.25 * cos((time * 0.92) * 0.41));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.25, -0.36)));
	}
	float v = exp(-trap * 3.93);
	float cc = clamp(0.5 + 0.5 * (v * 2.58), 0.0, 1.0);
	vec3 col = mix(vec3(0.154, 0.091, 0.084), vec3(0.615, 0.847, 1.000), smoothstep(0.0, 1.0, cc));
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.027, 0.951, 1.016);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
