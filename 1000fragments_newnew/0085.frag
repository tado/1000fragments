uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	vec2 z = p;
	vec2 c = vec2(-0.34 + 0.27 * sin((time * 0.54) * 1.10), -0.26 + 0.06 * cos((time * 0.54) * 0.44));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.36, -0.42)));
	}
	float v = exp(-trap * 2.20);
	vec3 col = vec3(0.5 + 0.5 * (v * 2.65)) * vec3(0.61, 0.54, 0.60) + vec3(0.04, 0.02, 0.05);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.68));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 0.998, 1.010) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
