uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	vec2 gp = p * 4.12;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 14.82 + rnd * 6.2831853 + time * 4.89);
	vec3 col = palette(v * 1.29 + time * 0.21, vec3(0.46, 0.40, 0.51), vec3(0.43, 0.43, 0.36), vec3(0.76, 0.87, 0.98), vec3(0.84, 0.67, 0.50));
	col *= 0.56 + 0.49 * hash21(id + 11.0);
	col = fract(col * 1.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
