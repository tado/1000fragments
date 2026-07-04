uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	vec2 gp = p * 4.99;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 17.68 + rnd * 6.2831853 + time * 2.62);
	vec3 col = palette(v * 0.51 + time * 0.15, vec3(0.50, 0.45, 0.56), vec3(0.45, 0.42, 0.38), vec3(0.89, 1.33, 0.95), vec3(0.90, 0.05, 0.95));
	col = mod(col * 1.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
