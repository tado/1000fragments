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
	vec2 c = vec2(0.10 + 0.06 * sin((time * 0.59) * 1.40), 0.15 + 0.28 * cos((time * 0.59) * 0.98));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.09);
	vec3 col = palette((v * 2.54) * 1.01 + (time * 0.59) * 0.19, vec3(0.33, 0.44, 0.46), vec3(0.30, 0.32, 0.32), vec3(0.58, 0.58, 0.82), vec3(0.57, 0.04, 0.89));
	col *= 0.89 + 0.11 * sin(gl_FragCoord.y * 2.30 + (time * 0.59) * 8.86);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.913, 0.972, 1.053) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
