uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	p = rot2(time * 1.39) * p;
	vec2 z = p;
	vec2 c = vec2(-0.11 + 0.24 * sin(time * 1.71), 0.21 + 0.08 * cos(time * 0.50));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.74);
	vec3 col = palette(v * 3.74 * 1.03 + time * 0.01, vec3(0.60, 0.59, 0.60), vec3(0.41, 0.47, 0.37), vec3(1.11, 1.14, 0.84), vec3(0.53, 0.73, 0.70));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
