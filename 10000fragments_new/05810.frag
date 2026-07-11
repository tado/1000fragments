uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 7.59;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.18 - 0.09 * sin(time * 2.36 + rnd * 6.2831853)) * 17.25);
	vec3 col = palette(v * 1.27 + time * 0.17, vec3(0.49, 0.57, 0.48), vec3(0.40, 0.40, 0.37), vec3(0.76, 0.96, 1.35), vec3(0.08, 0.54, 0.51));
	col *= 0.60 + 0.36 * hash21(id + 11.0);
	col *= 0.90 + 0.16 * sin(gl_FragCoord.y * 2.69 + time * 4.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
