uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.29 * sin((time * 0.56) * 1.98), -0.03 + 0.27 * cos((time * 0.56) * 0.78));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.03, 0.35)));
	}
	float v = exp(-trap * 2.31);
	vec3 col = palette((v * 1.69) * 1.05 + (time * 0.56) * 0.08, vec3(0.25, 0.23, 0.21), vec3(0.14, 0.14, 0.19), vec3(0.66, 0.74, 0.63), vec3(0.97, 0.16, 0.09));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 0.968, 1.002) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
