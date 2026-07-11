uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	vec2 gp = p * 4.63;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 28.23 - time * 3.01 + rnd * 6.2831853);
	vec3 col = palette(v * 0.59 + time * 0.13, vec3(0.47, 0.45, 0.48), vec3(0.47, 0.37, 0.32), vec3(1.26, 1.09, 1.16), vec3(0.53, 0.68, 0.25));
	col *= 0.82 + 0.19 * sin(gl_FragCoord.y * 2.12 + time * 7.93);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
