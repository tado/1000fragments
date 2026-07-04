uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	vec2 z = p;
	vec2 c = vec2(-0.83 + 0.19 * sin(time * 1.85), -0.08 + 0.07 * cos(time * 0.52));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.40, 0.27)));
	}
	float v = exp(-trap * 3.79);
	vec3 col = palette(v * 2.43 * 0.92 + time * 0.16, vec3(0.44, 0.41, 0.52), vec3(0.42, 0.45, 0.41), vec3(1.04, 0.83, 0.99), vec3(0.31, 0.45, 0.79));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
