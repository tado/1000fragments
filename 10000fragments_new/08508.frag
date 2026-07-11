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
	vec2 gp = p * 6.10;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.11 * sin(time * 2.19 + rnd * 6.2831853)) * 24.86);
	vec3 col = palette(v * 0.95 + time * 0.36, vec3(0.57, 0.42, 0.47), vec3(0.41, 0.48, 0.43), vec3(0.73, 0.84, 1.07), vec3(0.26, 0.66, 0.27));
	col *= 0.59 + 0.41 * hash21(id + 11.0);
	col = fract(col * 1.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
