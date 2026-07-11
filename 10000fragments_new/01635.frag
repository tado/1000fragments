uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 7.93;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.22 - 0.09 * sin(time * 4.72 + rnd * 6.2831853)) * 10.72);
	vec3 col = palette(v * 0.57 + time * 0.25, vec3(0.46, 0.43, 0.43), vec3(0.42, 0.49, 0.31), vec3(0.98, 0.92, 0.77), vec3(0.64, 0.97, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
