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
	p *= 2.28;
	p = rot2(time * 0.89) * p;
	vec2 gp = p * 7.09;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 27.85 - time * 2.28 + rnd * 6.2831853);
	vec3 col = palette(v * 0.48 + time * 0.05, vec3(0.42, 0.51, 0.59), vec3(0.47, 0.49, 0.38), vec3(0.97, 1.38, 1.15), vec3(0.25, 0.37, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
