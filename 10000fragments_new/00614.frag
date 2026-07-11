uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 3.29;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.28 - 0.10 * sin(time * 5.62 + rnd * 6.2831853)) * 19.11);
	vec3 col = palette(v * 1.02 + time * 0.20, vec3(0.58, 0.52, 0.60), vec3(0.44, 0.49, 0.35), vec3(1.20, 1.24, 0.86), vec3(0.99, 0.03, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
