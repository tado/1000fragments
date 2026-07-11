uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	vec2 gp = p * 6.33;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 26.81 - time * 2.42 + rnd * 6.2831853);
	vec3 col = palette(v * 1.05 + time * 0.32, vec3(0.48, 0.58, 0.45), vec3(0.32, 0.49, 0.44), vec3(1.17, 1.29, 1.07), vec3(0.36, 0.44, 0.12));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.25 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
