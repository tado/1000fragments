uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.59;
	p.y += sin(p.x * 1.83 + (time * 0.65) * 1.11) * 0.08;
	p *= 1.48;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.20 * sin((time * 0.65) * 1.10), 0.55 + 0.13 * cos((time * 0.65) * 0.99));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.49);
	vec3 col = vec3(0.5 + 0.5 * (v * 1.53)) * vec3(0.48, 0.49, 0.57) + vec3(0.03, 0.08, 0.04);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.008, 0.958, 1.017) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
