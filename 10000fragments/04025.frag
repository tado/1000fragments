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
	p *= 2.52;
	p = rot2(time * -0.49) * p;
	vec2 gp = p * 3.51;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 18.27 - time * 2.05 + rnd * 6.2831853);
	vec3 col = palette(v * 0.72 + time * 0.26, vec3(0.44, 0.45, 0.58), vec3(0.38, 0.34, 0.33), vec3(0.76, 0.99, 1.27), vec3(0.99, 0.12, 0.24));
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
