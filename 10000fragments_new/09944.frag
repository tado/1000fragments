uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	vec2 gp = p * 7.79;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 18.74 + rnd * 6.2831853 + time * 6.79);
	vec3 col = palette(v * 0.88 + time * 0.03, vec3(0.45, 0.45, 0.45), vec3(0.48, 0.33, 0.31), vec3(1.37, 0.70, 0.81), vec3(0.06, 0.71, 0.52));
	col *= 0.61 + 0.38 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.77 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
