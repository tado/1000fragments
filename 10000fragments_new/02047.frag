uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 6.90;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 23.94 + rnd * 6.2831853 + time * 6.58);
	vec3 col = palette(v * 0.61 + time * 0.33, vec3(0.54, 0.52, 0.54), vec3(0.44, 0.36, 0.40), vec3(0.85, 0.78, 0.72), vec3(0.20, 0.48, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
