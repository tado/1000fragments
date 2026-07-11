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
	p *= 1.17;
	vec2 gp = p * 2.11;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.11 * sin(time * 3.39 + rnd * 6.2831853)) * 21.46);
	vec3 col = palette(v * 1.47 + time * 0.40, vec3(0.44, 0.52, 0.51), vec3(0.39, 0.49, 0.47), vec3(1.22, 1.05, 1.25), vec3(0.66, 0.40, 0.94));
	col *= 0.66 + 0.48 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
