uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	vec2 gp = p * 3.25;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 22.47 + rnd * 6.2831853 + time * 5.97);
	vec3 col = palette(v * 0.49 + time * 0.15, vec3(0.41, 0.54, 0.53), vec3(0.32, 0.46, 0.36), vec3(0.87, 0.86, 1.20), vec3(0.91, 0.55, 0.72));
	col *= 0.85 + 0.11 * sin(gl_FragCoord.y * 2.64 + time * 5.96);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
