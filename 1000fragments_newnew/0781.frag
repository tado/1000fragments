uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	vec2 z = p;
	vec2 c = vec2(-0.27 + 0.21 * sin((time * 0.63) * 1.14), 0.11 + 0.28 * cos((time * 0.63) * 0.84));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.25);
	vec3 col = palette((v * 3.33) * 0.53 + (time * 0.63) * 0.17, vec3(0.44, 0.43, 0.45), vec3(0.20, 0.23, 0.28), vec3(0.60, 0.61, 0.69), vec3(0.32, 0.92, 0.16));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.936, 0.977, 1.035) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
