uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	vec2 gp = p * 7.64;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 9.09 + rnd * 6.2831853 + time * 5.84);
	vec3 col = palette(v * 1.26 + time * 0.26, vec3(0.48, 0.57, 0.57), vec3(0.32, 0.39, 0.42), vec3(1.16, 1.34, 0.77), vec3(0.34, 0.11, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
