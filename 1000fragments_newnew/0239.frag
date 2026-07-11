uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	vec2 z = p;
	vec2 c = vec2(0.19 + 0.14 * sin((time * 0.74) * 1.96), 0.09 + 0.23 * cos((time * 0.74) * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.67);
	vec3 col = palette((v * 1.92) * 0.59 + (time * 0.74) * 0.03, vec3(0.23, 0.29, 0.31), vec3(0.18, 0.21, 0.17), vec3(0.73, 0.44, 0.51), vec3(0.28, 0.11, 0.27));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.988, 0.988, 1.015) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
