uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 5.03;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.08 * sin(time * 3.80 + rnd * 6.2831853)) * 19.41);
	vec3 col = palette(v * 0.58 + time * 0.09, vec3(0.42, 0.47, 0.44), vec3(0.43, 0.39, 0.32), vec3(1.38, 0.97, 1.27), vec3(0.46, 0.30, 0.54));
	col *= 0.62 + 0.30 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
