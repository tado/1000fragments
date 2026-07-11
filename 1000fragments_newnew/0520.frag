uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	vec2 z = p;
	vec2 c = vec2(-0.20 + 0.13 * sin((time * 0.54) * 1.63), 0.06 + 0.16 * cos((time * 0.54) * 0.54));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.34, -0.43)));
	}
	float v = exp(-trap * 4.98);
	vec3 col = palette((v * 2.03) * 0.68 + (time * 0.54) * 0.07, vec3(0.51, 0.45, 0.46), vec3(0.11, 0.12, 0.15), vec3(0.44, 0.84, 0.71), vec3(0.45, 0.56, 0.04));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.993, 0.991, 1.009) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
