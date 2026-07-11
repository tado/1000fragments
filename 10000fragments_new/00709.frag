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
	p *= 1.09;
	vec2 gp = p * 5.90;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.22 - 0.09 * sin(time * 3.12 + rnd * 6.2831853)) * 25.58);
	vec3 col = palette(v * 0.95 + time * 0.40, vec3(0.40, 0.43, 0.60), vec3(0.40, 0.46, 0.32), vec3(1.17, 0.94, 1.20), vec3(0.23, 0.45, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
