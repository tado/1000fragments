uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	vec2 z = p;
	vec2 c = vec2(0.05 + 0.26 * sin(time * 1.21), 0.17 + 0.29 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.82);
	vec3 col = palette(v * 3.54 * 0.90 + time * 0.26, vec3(0.49, 0.52, 0.59), vec3(0.48, 0.34, 0.40), vec3(1.24, 0.82, 0.95), vec3(0.76, 0.46, 0.06));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
