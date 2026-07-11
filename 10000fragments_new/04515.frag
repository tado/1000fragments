uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 2.18;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.25 - 0.18 * sin(time * 3.28 + rnd * 6.2831853)) * 21.47);
	vec3 col = palette(v * 0.48 + time * 0.37, vec3(0.58, 0.43, 0.51), vec3(0.47, 0.49, 0.42), vec3(0.92, 1.07, 0.74), vec3(0.93, 0.65, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
