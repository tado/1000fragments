uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	vec2 gp = p * 7.11;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.18 * sin(time * 5.49 + rnd * 6.2831853)) * 15.50);
	vec3 col = palette(v * 1.30 + time * 0.18, vec3(0.52, 0.41, 0.44), vec3(0.48, 0.42, 0.40), vec3(0.91, 0.88, 0.87), vec3(0.64, 0.54, 0.67));
	col *= 0.56 + 0.40 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
