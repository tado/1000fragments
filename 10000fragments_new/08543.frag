uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	p = rot2(time * -0.53) * p;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.18 * sin(time * 1.36), 0.50 + 0.20 * cos(time * 0.73));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.35);
	vec3 col = palette(v * 1.86 * 0.86 + time * 0.28, vec3(0.51, 0.54, 0.44), vec3(0.50, 0.48, 0.34), vec3(0.95, 0.99, 0.93), vec3(0.95, 0.26, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
