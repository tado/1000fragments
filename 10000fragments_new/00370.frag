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
	p *= 1.05;
	p = rot2(time * 0.36) * p;
	vec2 z = p;
	vec2 c = vec2(0.23 + 0.28 * sin(time * 0.52), -0.48 + 0.15 * cos(time * 1.58));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.23, -0.02)));
	}
	float v = exp(-trap * 5.73);
	vec3 col = palette(v * 2.23 * 0.83 + time * 0.14, vec3(0.51, 0.53, 0.59), vec3(0.32, 0.38, 0.42), vec3(1.39, 1.35, 0.93), vec3(0.13, 0.97, 0.34));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
