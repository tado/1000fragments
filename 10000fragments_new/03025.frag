uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 3.49;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.20 - 0.09 * sin(time * 2.85 + rnd * 6.2831853)) * 25.93);
	vec3 col = palette(v * 0.87 + time * 0.20, vec3(0.43, 0.57, 0.55), vec3(0.35, 0.41, 0.38), vec3(1.08, 1.35, 0.84), vec3(0.04, 0.61, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
