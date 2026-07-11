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
	p *= 0.94;
	p = rot2(time * 0.54) * p;
	vec2 gp = p * 6.76;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 13.67 - time * 3.87 + rnd * 6.2831853);
	vec3 col = palette(v * 0.74 + time * 0.04, vec3(0.55, 0.54, 0.57), vec3(0.45, 0.45, 0.31), vec3(0.70, 0.89, 1.36), vec3(0.04, 0.29, 0.81));
	col *= 0.63 + 0.32 * hash21(id + 11.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.44 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
