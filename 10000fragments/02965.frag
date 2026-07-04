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
	vec2 gp = p * 4.80;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 13.46 - time * 5.76 + rnd * 6.2831853);
	vec3 col = palette(v * 1.05 + time * 0.23, vec3(0.52, 0.54, 0.59), vec3(0.34, 0.32, 0.48), vec3(0.76, 0.82, 0.90), vec3(0.41, 0.58, 0.60));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.88 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
