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
	vec2 gp = p * 5.23;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 10.55 + rnd * 6.2831853 + time * 3.45);
	vec3 col = palette(v * 0.96 + time * 0.25, vec3(0.48, 0.57, 0.56), vec3(0.34, 0.34, 0.45), vec3(1.38, 0.97, 1.28), vec3(0.11, 0.80, 0.04));
	col = mod(col * 2.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
