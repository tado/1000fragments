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
	p *= 2.30;
	vec2 gp = p * 2.29;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.21 - 0.14 * sin(time * 2.29 + rnd * 6.2831853)) * 12.92);
	vec3 col = palette(v * 0.55 + time * 0.05, vec3(0.49, 0.49, 0.53), vec3(0.33, 0.38, 0.37), vec3(0.91, 0.70, 0.96), vec3(0.27, 0.33, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
