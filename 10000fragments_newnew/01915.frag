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
	vec2 gp = p * 7.13;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.22 - 0.15 * sin(time * 4.15 + rnd * 6.2831853)) * 24.15);
	vec3 col = palette(v * 0.58 + time * 0.23, vec3(0.47, 0.52, 0.49), vec3(0.39, 0.35, 0.42), vec3(0.98, 0.82, 1.39), vec3(0.59, 0.63, 0.58));
	col *= 0.55 + 0.42 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
