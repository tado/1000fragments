uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	vec2 gp = p * 4.20;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.27 - 0.18 * sin(time * 2.15 + rnd * 6.2831853)) * 24.93);
	vec3 col = palette(v * 0.91 + time * 0.09, vec3(0.51, 0.57, 0.54), vec3(0.50, 0.44, 0.35), vec3(1.01, 1.33, 0.94), vec3(0.79, 0.34, 0.12));
	col *= 0.86 + 0.20 * sin(gl_FragCoord.y * 2.83 + time * 17.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
