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
	p *= 1.28;
	p = rot2(time * -1.16) * p;
	vec2 z = p;
	vec2 c = vec2(-0.78 + 0.23 * sin(time * 2.00), -0.56 + 0.24 * cos(time * 1.35));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.68);
	vec3 col = palette(v * 3.00 * 0.98 + time * 0.16, vec3(0.54, 0.44, 0.46), vec3(0.43, 0.45, 0.32), vec3(1.14, 1.32, 0.77), vec3(0.53, 0.53, 0.27));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
