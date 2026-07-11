uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	vec2 gp = p * 3.76;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 28.83 - time * 2.93 + rnd * 6.2831853);
	vec3 col = palette(v * 0.98 + time * 0.08, vec3(0.53, 0.47, 0.60), vec3(0.31, 0.34, 0.47), vec3(0.74, 1.37, 1.33), vec3(0.60, 0.24, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
