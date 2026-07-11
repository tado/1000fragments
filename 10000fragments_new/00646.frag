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
	p = rot2(time * -0.31) * p;
	vec2 gp = p * 3.32;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 20.56 - time * 7.69 + rnd * 6.2831853);
	vec3 col = palette(v * 1.47 + time * 0.35, vec3(0.50, 0.42, 0.55), vec3(0.32, 0.30, 0.46), vec3(1.28, 1.12, 1.28), vec3(0.14, 0.86, 0.17));
	col *= 0.55 + 0.47 * hash21(id + 11.0);
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 0.86 + time * 6.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
