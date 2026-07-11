uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 5.13;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 14.41 + rnd * 6.2831853 + time * 6.45);
	vec3 col = palette(v * 0.52 + time * 0.09, vec3(0.51, 0.43, 0.42), vec3(0.44, 0.50, 0.46), vec3(1.05, 0.93, 1.00), vec3(0.87, 0.64, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
