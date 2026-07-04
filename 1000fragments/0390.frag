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
	p *= 1.20;
	p = rot2(time * 1.34) * p;
	vec2 z = p;
	vec2 c = vec2(0.21 + 0.18 * sin(time * 1.68), -0.49 + 0.20 * cos(time * 0.49));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.36, -0.04)));
	}
	float v = exp(-trap * 5.01);
	vec3 col = palette(v * 2.07 * 0.62 + time * 0.27, vec3(0.51, 0.42, 0.56), vec3(0.31, 0.34, 0.46), vec3(1.31, 0.87, 1.15), vec3(0.40, 0.02, 0.92));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
