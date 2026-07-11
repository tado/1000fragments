uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.74) * 0.90), cos((time * 0.74) * 0.30)) * 0.09;
	p *= 1.34;
	vec2 z = p;
	vec2 c = vec2(-0.03 + 0.28 * sin((time * 0.74) * 1.69), -0.38 + 0.26 * cos((time * 0.74) * 0.96));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.91);
	vec3 col = palette((v * 2.09) * 0.90 + (time * 0.74) * 0.17, vec3(0.45, 0.46, 0.49), vec3(0.26, 0.25, 0.33), vec3(0.85, 0.63, 0.77), vec3(0.43, 0.39, 0.69));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(0.928, 0.980, 1.026) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
