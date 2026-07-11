uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.22;
	p *= 2.03;
	vec2 z = p;
	vec2 c = vec2(-0.60 + 0.14 * sin((time * 0.70) * 1.57), -0.35 + 0.16 * cos((time * 0.70) * 1.15));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.65);
	vec3 col = palette((v * 3.10) * 0.68 + (time * 0.70) * 0.01, vec3(0.34, 0.39, 0.33), vec3(0.13, 0.18, 0.18), vec3(0.72, 0.86, 0.49), vec3(0.92, 0.59, 0.98));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 0.985, 0.934) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
