uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.46;
	vec2 gp = p * 2.76;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.23 - 0.14 * sin(time * 5.33 + rnd * 6.2831853)) * 25.82);
	vec3 col = palette(v * 1.31 + time * 0.30, vec3(0.43, 0.46, 0.44), vec3(0.32, 0.34, 0.34), vec3(0.84, 1.10, 1.17), vec3(0.87, 0.76, 0.88));
	col *= 0.57 + 0.33 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 2.07 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
