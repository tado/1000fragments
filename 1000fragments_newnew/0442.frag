uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.26 * sin((time * 0.74) * 1.17), -0.04 + 0.29 * cos((time * 0.74) * 0.57));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.67);
	vec3 col = palette((v * 2.57) * 0.57 + (time * 0.74) * 0.07, vec3(0.32, 0.29, 0.31), vec3(0.19, 0.17, 0.12), vec3(0.60, 0.45, 0.66), vec3(0.44, 0.53, 0.47));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.46));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 0.974, 0.998) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
