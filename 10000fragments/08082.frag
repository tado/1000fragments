uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	vec2 gp = p * 7.93;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 8.03 + rnd * 6.2831853 + time * 2.27);
	vec3 col = palette(v * 0.65 + time * 0.14, vec3(0.49, 0.58, 0.56), vec3(0.35, 0.31, 0.50), vec3(0.89, 0.71, 1.39), vec3(0.60, 0.34, 0.31));
	col *= 0.66 + 0.38 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
