uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	vec2 gp = p * 2.35;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.15 * sin(time * 5.07 + rnd * 6.2831853)) * 19.76);
	vec3 col = palette(v * 1.16 + time * 0.17, vec3(0.58, 0.53, 0.56), vec3(0.43, 0.44, 0.38), vec3(1.14, 0.86, 1.23), vec3(0.41, 0.54, 0.81));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.26 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
