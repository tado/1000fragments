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
	p *= 0.94;
	vec2 gp = p * 7.15;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.29 - 0.11 * sin(time * 2.12 + rnd * 6.2831853)) * 25.83);
	vec3 col = palette(v * 0.46 + time * 0.39, vec3(0.54, 0.51, 0.56), vec3(0.44, 0.49, 0.33), vec3(1.39, 0.90, 1.03), vec3(0.77, 0.50, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
