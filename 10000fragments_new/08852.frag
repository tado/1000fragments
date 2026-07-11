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
	p *= 1.85;
	p = rot2(time * 0.61) * p;
	vec2 gp = p * 7.38;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 19.37 - time * 2.48 + rnd * 6.2831853);
	vec3 col = palette(v * 1.04 + time * 0.31, vec3(0.59, 0.51, 0.46), vec3(0.40, 0.37, 0.39), vec3(0.98, 0.87, 1.19), vec3(0.28, 0.90, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
