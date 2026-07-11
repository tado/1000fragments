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
	p *= 1.19;
	p = rot2(time * -1.11) * p;
	vec2 gp = p * 6.92;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.21 - 0.10 * sin(time * 4.94 + rnd * 6.2831853)) * 25.21);
	vec3 col = palette(v * 0.85 + time * 0.13, vec3(0.45, 0.59, 0.58), vec3(0.47, 0.31, 0.31), vec3(1.34, 0.84, 1.33), vec3(0.57, 0.51, 0.82));
	col *= 0.66 + 0.38 * hash21(id + 11.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
