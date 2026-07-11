uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	vec2 gp = p * 6.87;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.29 - 0.09 * sin(time * 1.98 + rnd * 6.2831853)) * 15.25);
	vec3 col = palette(v * 1.10 + time * 0.32, vec3(0.54, 0.52, 0.56), vec3(0.30, 0.37, 0.49), vec3(0.73, 1.03, 1.25), vec3(0.56, 0.15, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
