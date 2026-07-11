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
	vec2 gp = p * 6.69;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.24 - 0.19 * sin(time * 4.94 + rnd * 6.2831853)) * 14.77);
	vec3 col = palette(v * 0.69 + time * 0.32, vec3(0.56, 0.52, 0.45), vec3(0.36, 0.38, 0.41), vec3(1.32, 1.36, 0.72), vec3(0.72, 0.88, 0.67));
	col *= 0.69 + 0.35 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
