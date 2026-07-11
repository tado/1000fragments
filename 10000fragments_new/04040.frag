uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	vec2 gp = p * 5.15;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.26 - 0.13 * sin(time * 3.63 + rnd * 6.2831853)) * 16.95);
	vec3 col = palette(v * 0.97 + time * 0.10, vec3(0.43, 0.52, 0.56), vec3(0.32, 0.31, 0.45), vec3(0.90, 1.09, 0.82), vec3(0.47, 0.88, 0.10));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.20 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
