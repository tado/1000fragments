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
	p.x += p.y * 0.67;
	p *= 1.99;
	vec2 z = p;
	vec2 c = vec2(-0.82 + 0.28 * sin((time * 0.61) * 0.72), 0.34 + 0.07 * cos((time * 0.61) * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.40);
	vec3 col = palette((v * 2.38) * 0.79 + (time * 0.61) * 0.21, vec3(0.27, 0.22, 0.21), vec3(0.20, 0.25, 0.25), vec3(0.58, 0.66, 0.54), vec3(0.39, 0.19, 0.92));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col = clamp(col, 0.0, 1.0) * vec3(1.026, 0.997, 0.944) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
