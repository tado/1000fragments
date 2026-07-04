uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	vec2 gp = p * 5.46;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 18.48 + rnd * 6.2831853 + time * 4.77);
	vec3 col = palette(v * 0.70 + time * 0.21, vec3(0.57, 0.55, 0.46), vec3(0.39, 0.44, 0.40), vec3(1.11, 0.98, 1.10), vec3(0.22, 0.11, 0.05));
	col *= 0.67 + 0.37 * hash21(id + 11.0);
	col = mod(col * 2.07, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
