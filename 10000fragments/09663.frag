uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	vec2 z = p;
	vec2 c = vec2(-0.12 + 0.17 * sin(time * 1.37), 0.59 + 0.11 * cos(time * 1.26));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.18, 0.17)));
	}
	float v = exp(-trap * 2.92);
	float cc = clamp(0.5 + 0.5 * v * 2.53, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.26, 0.30), vec3(0.68, 0.58, 0.97), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.82 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
