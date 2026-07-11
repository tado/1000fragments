uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.x = abs(p.x) - 0.40;
	p *= 2.02;
	vec2 z = p;
	vec2 c = vec2(-0.33 + 0.23 * sin((time * 0.72) * 1.53), -0.21 + 0.13 * cos((time * 0.72) * 1.52));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.00);
	vec3 col = palette((v * 3.19) * 0.65 + (time * 0.72) * 0.12, vec3(0.40, 0.39, 0.46), vec3(0.23, 0.21, 0.23), vec3(0.56, 0.79, 0.84), vec3(0.91, 0.47, 0.11));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(0.996, 1.003, 1.007) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
