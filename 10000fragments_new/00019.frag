uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 7.62;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 13.31 + rnd * 6.2831853 + time * 5.08);
	vec3 col = palette(v * 1.43 + time * 0.35, vec3(0.58, 0.54, 0.56), vec3(0.46, 0.31, 0.43), vec3(1.30, 0.95, 1.09), vec3(0.63, 0.76, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
