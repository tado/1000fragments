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
	p *= 2.42;
	vec2 gp = p * 6.82;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 14.09 - time * 5.70 + rnd * 6.2831853);
	vec3 col = palette(v * 0.48 + time * 0.07, vec3(0.45, 0.47, 0.47), vec3(0.43, 0.46, 0.41), vec3(0.81, 1.06, 1.01), vec3(0.39, 0.30, 0.39));
	col *= 0.54 + 0.49 * hash21(id + 11.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
