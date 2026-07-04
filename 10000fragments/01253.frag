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
	p *= 1.08;
	p = rot2(time * 0.56) * p;
	vec2 z = p;
	vec2 c = vec2(-0.30 + 0.30 * sin(time * 1.42), 0.55 + 0.13 * cos(time * 1.13));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.21, 0.19)));
	}
	float v = exp(-trap * 3.57);
	vec3 col = palette(v * 3.14 * 0.56 + time * 0.36, vec3(0.52, 0.43, 0.58), vec3(0.31, 0.44, 0.36), vec3(1.39, 0.86, 1.14), vec3(0.17, 0.94, 0.82));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
