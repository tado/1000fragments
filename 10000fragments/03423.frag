uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	vec2 gp = p * 2.59;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 23.42 - time * 2.63 + rnd * 6.2831853);
	vec3 col = palette(v * 1.38 + time * 0.19, vec3(0.55, 0.54, 0.42), vec3(0.38, 0.42, 0.37), vec3(0.94, 1.26, 0.94), vec3(0.61, 0.64, 0.63));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.92 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
