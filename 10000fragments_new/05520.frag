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
	p *= 1.84;
	vec2 gp = p * 3.79;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 27.16 - time * 5.65 + rnd * 6.2831853);
	vec3 col = palette(v * 0.84 + time * 0.29, vec3(0.42, 0.55, 0.60), vec3(0.36, 0.48, 0.49), vec3(0.79, 0.75, 0.72), vec3(0.25, 0.27, 0.64));
	col *= 0.65 + 0.44 * hash21(id + 11.0);
	col *= 0.90 + 0.12 * sin(gl_FragCoord.y * 2.71 + time * 14.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
