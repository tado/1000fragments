uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	p = rot2(time * -0.97) * p;
	vec2 z = p;
	vec2 c = vec2(-0.85 + 0.20 * sin(time * 1.16), -0.41 + 0.18 * cos(time * 1.52));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.46);
	vec3 col = palette(v * 3.28 * 1.16 + time * 0.04, vec3(0.54, 0.46, 0.50), vec3(0.40, 0.46, 0.31), vec3(1.19, 1.00, 1.17), vec3(0.70, 0.85, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
