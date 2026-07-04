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
	p *= 1.89;
	vec2 gp = p * 6.31;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.27 - 0.15 * sin(time * 1.75 + rnd * 6.2831853)) * 11.62);
	vec3 col = palette(v * 1.44 + time * 0.09, vec3(0.59, 0.42, 0.51), vec3(0.32, 0.49, 0.32), vec3(1.33, 0.78, 0.85), vec3(0.19, 0.67, 0.83));
	col *= 0.68 + 0.48 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
