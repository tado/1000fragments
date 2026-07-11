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
	p *= 2.18;
	p = rot2(time * 1.38) * p;
	vec2 z = p;
	vec2 c = vec2(-0.63 + 0.13 * sin(time * 1.68), -0.43 + 0.18 * cos(time * 0.53));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.96);
	vec3 col = palette(v * 3.13 * 1.46 + time * 0.10, vec3(0.53, 0.59, 0.42), vec3(0.39, 0.43, 0.41), vec3(1.06, 0.78, 0.74), vec3(0.48, 0.93, 0.93));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
