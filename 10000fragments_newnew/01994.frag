uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	vec2 z = p;
	vec2 c = vec2(-0.72 + 0.23 * sin(time * 0.66), -0.14 + 0.18 * cos(time * 0.46));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.16, -0.20)));
	}
	float v = exp(-trap * 2.77);
	vec3 col = palette(v * 3.12 * 1.38 + time * 0.12, vec3(0.53, 0.51, 0.54), vec3(0.46, 0.45, 0.48), vec3(1.15, 0.92, 1.12), vec3(0.38, 0.59, 0.57));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
