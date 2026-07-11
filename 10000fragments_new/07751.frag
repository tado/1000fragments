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
	p *= 1.47;
	p = rot2(time * 1.54) * p;
	vec2 z = p;
	vec2 c = vec2(-0.73 + 0.29 * sin(time * 1.12), -0.17 + 0.24 * cos(time * 0.48));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.28, 0.38)));
	}
	float v = exp(-trap * 3.27);
	vec3 col = palette(v * 3.33 * 0.85 + time * 0.10, vec3(0.44, 0.43, 0.60), vec3(0.32, 0.47, 0.44), vec3(1.40, 0.87, 0.79), vec3(0.60, 0.12, 0.49));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
