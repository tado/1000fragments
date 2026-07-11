uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 6.35;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.22 - 0.15 * sin(time * 4.59 + rnd * 6.2831853)) * 13.71);
	vec3 col = palette(v * 0.79 + time * 0.12, vec3(0.54, 0.52, 0.53), vec3(0.44, 0.44, 0.40), vec3(1.00, 0.70, 1.35), vec3(0.56, 0.88, 0.48));
	col *= 0.64 + 0.48 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
