uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.64;
	vec2 gp = p * 6.10;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 24.85 - time * 7.53 + rnd * 6.2831853);
	vec3 col = palette(v * 0.57 + time * 0.22, vec3(0.48, 0.50, 0.42), vec3(0.38, 0.47, 0.45), vec3(0.91, 0.79, 1.16), vec3(0.86, 0.69, 0.15));
	col *= 0.67 + 0.39 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
