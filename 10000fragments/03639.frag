uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.09;
	p = rot2(time * -0.57) * p;
	vec2 gp = p * 7.13;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.21 - 0.10 * sin(time * 2.44 + rnd * 6.2831853)) * 19.84);
	vec3 col = palette(v * 0.97 + time * 0.29, vec3(0.53, 0.55, 0.53), vec3(0.47, 0.50, 0.48), vec3(1.05, 1.33, 1.30), vec3(0.58, 0.77, 0.10));
	col *= 0.62 + 0.32 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
