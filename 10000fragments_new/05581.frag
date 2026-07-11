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
	vec2 gp = p * 2.77;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 8.70 + rnd * 6.2831853 + time * 2.42);
	vec3 col = palette(v * 1.41 + time * 0.16, vec3(0.41, 0.47, 0.51), vec3(0.39, 0.42, 0.45), vec3(0.92, 1.22, 1.27), vec3(0.42, 0.88, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
