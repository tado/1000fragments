uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	vec2 z = p;
	vec2 c = vec2(-0.01 + 0.25 * sin(time * 1.45), 0.47 + 0.05 * cos(time * 1.10));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.93);
	vec3 col = palette(v * 2.76 * 1.00 + time * 0.25, vec3(0.44, 0.55, 0.47), vec3(0.39, 0.35, 0.46), vec3(1.04, 1.22, 0.78), vec3(0.89, 0.60, 0.90));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
