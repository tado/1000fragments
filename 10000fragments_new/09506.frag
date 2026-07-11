uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	vec2 gp = p * 2.07;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 17.28 + rnd * 6.2831853 + time * 4.33);
	vec3 col = palette(v * 0.69 + time * 0.24, vec3(0.60, 0.56, 0.56), vec3(0.40, 0.44, 0.44), vec3(1.06, 0.80, 0.98), vec3(0.55, 0.68, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
