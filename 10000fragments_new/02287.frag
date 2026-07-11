uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.13 * sin(time * 1.39), 0.48 + 0.10 * cos(time * 0.60));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.04, -0.07)));
	}
	float v = exp(-trap * 5.61);
	vec3 col = palette(v * 2.17 * 1.43 + time * 0.08, vec3(0.59, 0.51, 0.48), vec3(0.37, 0.39, 0.38), vec3(1.14, 1.17, 0.72), vec3(0.05, 0.75, 0.07));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
