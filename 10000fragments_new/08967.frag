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
	p *= 2.31;
	vec2 gp = p * 7.37;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 8.86 + rnd * 6.2831853 + time * 3.16);
	vec3 col = palette(v * 0.93 + time * 0.26, vec3(0.47, 0.58, 0.56), vec3(0.32, 0.44, 0.47), vec3(0.95, 0.87, 1.05), vec3(0.40, 0.29, 0.54));
	col *= 0.55 + 0.34 * hash21(id + 11.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
