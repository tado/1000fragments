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
	p *= 0.96;
	vec2 gp = p * 7.37;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.18 - 0.09 * sin(time * 3.49 + rnd * 6.2831853)) * 25.83);
	vec3 col = palette(v * 0.93 + time * 0.04, vec3(0.54, 0.42, 0.59), vec3(0.38, 0.42, 0.50), vec3(1.12, 0.72, 0.75), vec3(0.28, 0.47, 0.70));
	col *= 0.54 + 0.45 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
