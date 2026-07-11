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
	p = rot2(time * -1.28) * p;
	vec2 gp = p * 2.07;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.20 - 0.09 * sin(time * 3.01 + rnd * 6.2831853)) * 12.04);
	vec3 col = palette(v * 0.84 + time * 0.11, vec3(0.47, 0.50, 0.58), vec3(0.33, 0.47, 0.37), vec3(0.94, 0.98, 1.16), vec3(0.09, 0.03, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
