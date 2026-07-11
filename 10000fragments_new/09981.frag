uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 4.27;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.26 - 0.09 * sin(time * 3.74 + rnd * 6.2831853)) * 25.94);
	vec3 col = palette(v * 0.84 + time * 0.34, vec3(0.59, 0.45, 0.48), vec3(0.45, 0.40, 0.45), vec3(1.03, 0.98, 0.81), vec3(0.33, 0.29, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
