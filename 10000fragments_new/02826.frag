uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	p = rot2(time * -0.87) * p;
	vec2 z = p;
	vec2 c = vec2(-0.50 + 0.26 * sin(time * 1.43), 0.50 + 0.21 * cos(time * 1.51));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.56);
	vec3 col = palette(v * 1.95 * 1.02 + time * 0.00, vec3(0.44, 0.54, 0.58), vec3(0.41, 0.31, 0.39), vec3(0.88, 0.74, 1.21), vec3(0.93, 0.58, 0.22));
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
