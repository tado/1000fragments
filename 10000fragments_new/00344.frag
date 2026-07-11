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
	p *= 1.74;
	p = rot2(time * -1.47) * p;
	vec2 gp = p * 4.57;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 11.96 - time * 3.24 + rnd * 6.2831853);
	vec3 col = palette(v * 0.82 + time * 0.08, vec3(0.44, 0.45, 0.53), vec3(0.33, 0.48, 0.47), vec3(1.05, 0.92, 1.03), vec3(0.57, 0.34, 0.79));
	col *= 0.87 + 0.19 * sin(gl_FragCoord.y * 2.50 + time * 4.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
