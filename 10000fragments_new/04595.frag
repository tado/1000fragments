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
	p *= 1.53;
	p = rot2(time * -0.96) * p;
	vec2 gp = p * 4.68;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 26.32 - time * 6.48 + rnd * 6.2831853);
	vec3 col = palette(v * 0.70 + time * 0.37, vec3(0.40, 0.49, 0.51), vec3(0.33, 0.48, 0.31), vec3(1.25, 0.83, 1.38), vec3(0.57, 0.67, 0.98));
	col *= 0.69 + 0.37 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
