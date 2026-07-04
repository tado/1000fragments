uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	vec2 gp = p * 6.64;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.25 - 0.18 * sin(time * 1.82 + rnd * 6.2831853)) * 20.07);
	vec3 col = palette(v * 0.98 + time * 0.22, vec3(0.43, 0.57, 0.59), vec3(0.38, 0.35, 0.39), vec3(1.25, 0.98, 0.89), vec3(0.42, 0.82, 0.19));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.92 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
