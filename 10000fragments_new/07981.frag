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
	vec2 gp = p * 7.20;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 10.52 + rnd * 6.2831853 + time * 2.15);
	vec3 col = palette(v * 0.69 + time * 0.01, vec3(0.44, 0.54, 0.46), vec3(0.39, 0.45, 0.47), vec3(0.73, 1.39, 1.05), vec3(0.21, 0.53, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
