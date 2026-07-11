uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.53;
	vec2 gp = p * 6.63;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 16.70 + rnd * 6.2831853 + time * 5.31);
	vec3 col = palette(v * 1.03 + time * 0.35, vec3(0.52, 0.51, 0.43), vec3(0.33, 0.46, 0.41), vec3(0.76, 0.79, 0.87), vec3(0.94, 0.73, 1.00));
	col *= 0.52 + 0.48 * hash21(id + 11.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.93 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
