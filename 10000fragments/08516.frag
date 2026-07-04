uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	vec2 gp = p * 6.34;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 21.51 + rnd * 6.2831853 + time * 2.58);
	vec3 col = palette(v * 0.42 + time * 0.40, vec3(0.56, 0.44, 0.56), vec3(0.40, 0.50, 0.36), vec3(1.19, 0.94, 0.85), vec3(0.49, 0.30, 0.13));
	col *= 0.54 + 0.31 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
