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
	p = rot2(time * 1.26) * p;
	vec2 gp = p * 2.50;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 23.15 - time * 4.01 + rnd * 6.2831853);
	vec3 col = palette(v * 1.10 + time * 0.34, vec3(0.43, 0.46, 0.44), vec3(0.43, 0.37, 0.30), vec3(1.12, 1.31, 1.26), vec3(0.05, 0.03, 0.35));
	col *= 0.53 + 0.30 * hash21(id + 11.0);
	col *= 0.83 + 0.12 * sin(gl_FragCoord.y * 1.10 + time * 6.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
