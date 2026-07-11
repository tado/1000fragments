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
	p *= 2.43;
	vec2 gp = p * 4.60;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 13.94 + rnd * 6.2831853 + time * 6.87);
	vec3 col = palette(v * 1.12 + time * 0.39, vec3(0.46, 0.48, 0.41), vec3(0.45, 0.38, 0.45), vec3(1.31, 1.05, 0.79), vec3(0.10, 0.53, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
