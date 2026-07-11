uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = rot2((time * 0.65) * -0.84) * p;
	vec2 z = p;
	vec2 c = vec2(-0.48 + 0.29 * sin((time * 0.65) * 1.83), 0.11 + 0.20 * cos((time * 0.65) * 0.65));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.48);
	vec3 col = palette((v * 2.74) * 0.91 + (time * 0.65) * 0.07, vec3(0.44, 0.43, 0.43), vec3(0.27, 0.23, 0.29), vec3(0.60, 0.53, 0.86), vec3(0.12, 0.29, 0.52));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.060, 0.971, 0.943) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
