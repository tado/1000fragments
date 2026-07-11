uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.34;
	vec2 gp = p * 6.38;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.26 - 0.18 * sin(time * 3.01 + rnd * 6.2831853)) * 22.41);
	vec3 col = palette(v * 0.93 + time * 0.37, vec3(0.53, 0.46, 0.51), vec3(0.32, 0.41, 0.39), vec3(1.23, 1.15, 0.88), vec3(0.10, 0.92, 0.91));
	col *= 0.64 + 0.38 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
