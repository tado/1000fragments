uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.78;
	p *= 1.88;
	vec2 z = p;
	vec2 c = vec2(-0.72 + 0.05 * sin((time * 0.62) * 1.49), 0.47 + 0.11 * cos((time * 0.62) * 1.58));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.26);
	vec3 col = palette((v * 1.58) * 0.70 + (time * 0.62) * 0.20, vec3(0.51, 0.50, 0.44), vec3(0.25, 0.26, 0.27), vec3(0.67, 0.76, 0.49), vec3(0.26, 0.88, 0.19));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 1.011, 1.007) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
