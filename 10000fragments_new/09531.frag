uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.42) * p;
	vec2 gp = p * 3.10;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.21 - 0.19 * sin(time * 1.86 + rnd * 6.2831853)) * 10.35);
	vec3 col = palette(v * 1.10 + time * 0.36, vec3(0.54, 0.47, 0.41), vec3(0.33, 0.37, 0.42), vec3(0.85, 0.95, 0.84), vec3(0.63, 0.50, 0.23));
	col *= 0.64 + 0.48 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
