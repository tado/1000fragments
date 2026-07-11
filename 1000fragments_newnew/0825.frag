uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec2 z = p;
	vec2 c = vec2(-0.85 + 0.25 * sin((time * 0.62) * 1.26), -0.12 + 0.20 * cos((time * 0.62) * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.35, -0.26)));
	}
	float v = exp(-trap * 1.52);
	float cc = clamp(0.5 + 0.5 * (v * 1.81), 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.03, 0.04), vec3(0.52, 0.66, 0.55), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.94 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(0.958, 1.008, 0.946) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
