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
	p *= 2.70;
	p = rot2(time * -0.61) * p;
	vec2 gp = p * 2.56;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 14.44 - time * 3.19 + rnd * 6.2831853);
	vec3 col = palette(v * 1.37 + time * 0.16, vec3(0.60, 0.42, 0.55), vec3(0.39, 0.31, 0.42), vec3(0.89, 0.88, 0.71), vec3(0.97, 0.94, 0.07));
	col *= 0.59 + 0.43 * hash21(id + 11.0);
	col *= 0.85 + 0.16 * sin(gl_FragCoord.y * 1.46 + time * 11.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
