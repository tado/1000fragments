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
	p *= 2.60;
	vec2 gp = p * 3.18;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 20.18 + rnd * 6.2831853 + time * 3.13);
	vec3 col = palette(v * 0.65 + time * 0.06, vec3(0.58, 0.48, 0.41), vec3(0.45, 0.34, 0.31), vec3(0.71, 0.99, 1.20), vec3(0.36, 0.38, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
