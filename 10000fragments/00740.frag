uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.10 * sin(time * 0.92), -0.41 + 0.20 * cos(time * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.15);
	vec3 col = palette(v * 3.45 * 0.57 + time * 0.08, vec3(0.49, 0.58, 0.43), vec3(0.48, 0.36, 0.36), vec3(1.07, 1.32, 1.40), vec3(0.34, 0.65, 0.75));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
