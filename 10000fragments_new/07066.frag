uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	vec2 gp = p * 5.55;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.25 - 0.12 * sin(time * 5.77 + rnd * 6.2831853)) * 11.95);
	vec3 col = palette(v * 1.46 + time * 0.09, vec3(0.55, 0.55, 0.54), vec3(0.34, 0.46, 0.31), vec3(1.06, 1.12, 1.38), vec3(0.29, 0.25, 0.37));
	col *= 0.59 + 0.31 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
