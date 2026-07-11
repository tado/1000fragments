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
	p *= 1.76;
	p = rot2(time * -0.83) * p;
	vec2 gp = p * 5.55;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.26 - 0.15 * sin(time * 2.00 + rnd * 6.2831853)) * 14.84);
	vec3 col = palette(v * 1.02 + time * 0.17, vec3(0.43, 0.52, 0.41), vec3(0.43, 0.50, 0.40), vec3(1.05, 1.24, 1.24), vec3(0.27, 0.87, 0.24));
	col *= 0.62 + 0.47 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
