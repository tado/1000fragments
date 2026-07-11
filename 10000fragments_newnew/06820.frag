uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	p = rot2(time * -1.06) * p;
	vec2 z = p;
	vec2 c = vec2(-0.30 + 0.22 * sin(time * 1.19), -0.12 + 0.11 * cos(time * 0.73));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.48, -0.32)));
	}
	float v = exp(-trap * 2.17);
	vec3 col = palette(v * 3.48 * 0.72 + time * 0.26, vec3(0.58, 0.54, 0.50), vec3(0.49, 0.37, 0.34), vec3(1.05, 0.87, 0.78), vec3(0.46, 0.76, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
