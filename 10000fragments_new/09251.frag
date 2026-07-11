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
	p *= 2.19;
	vec2 gp = p * 4.82;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 15.97 + rnd * 6.2831853 + time * 2.72);
	vec3 col = palette(v * 1.18 + time * 0.10, vec3(0.49, 0.53, 0.50), vec3(0.34, 0.32, 0.45), vec3(1.27, 0.96, 0.72), vec3(0.15, 0.89, 0.26));
	col = fract(col * 1.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
