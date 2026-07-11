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
	p = rot2(time * -0.57) * p;
	vec2 z = p;
	vec2 c = vec2(-0.77 + 0.22 * sin(time * 1.57), 0.53 + 0.06 * cos(time * 1.24));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.53);
	vec3 col = palette(v * 2.99 * 0.68 + time * 0.30, vec3(0.52, 0.41, 0.48), vec3(0.34, 0.35, 0.37), vec3(1.24, 0.95, 1.09), vec3(0.05, 0.90, 0.25));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
