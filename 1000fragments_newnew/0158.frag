uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec2 z = p;
	vec2 c = vec2(-0.73 + 0.13 * sin((time * 0.74) * 1.17), -0.41 + 0.16 * cos((time * 0.74) * 0.99));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.00);
	vec3 col = palette((v * 3.67) * 0.50 + (time * 0.74) * 0.11, vec3(0.46, 0.44, 0.48), vec3(0.26, 0.25, 0.24), vec3(0.40, 0.54, 0.64), vec3(0.56, 0.31, 0.90));
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 2.74 + (time * 0.74) * 5.56);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 1.010, 0.997) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
