uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	vec2 gp = p * 2.50;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.22 - 0.13 * sin(time * 1.61 + rnd * 6.2831853)) * 16.26);
	vec3 col = palette(v * 1.17 + time * 0.15, vec3(0.40, 0.47, 0.50), vec3(0.44, 0.49, 0.42), vec3(0.79, 1.25, 1.18), vec3(0.57, 0.19, 0.16));
	col = mod(col * 2.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
