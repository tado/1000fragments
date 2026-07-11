uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.75;
	vec2 gp = p * 5.25;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 23.76 + rnd * 6.2831853 + time * 5.05);
	vec3 col = palette(v * 1.40 + time * 0.27, vec3(0.51, 0.51, 0.55), vec3(0.42, 0.45, 0.46), vec3(0.99, 1.22, 1.32), vec3(0.99, 0.32, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
