uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.80;
	vec2 gp = p * 2.43;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 22.41 + rnd * 6.2831853 + time * 4.40);
	vec3 col = palette(v * 0.86 + time * 0.32, vec3(0.52, 0.58, 0.55), vec3(0.39, 0.44, 0.48), vec3(0.98, 1.11, 0.90), vec3(0.28, 0.82, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
