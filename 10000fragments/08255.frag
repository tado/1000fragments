uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.08) * p;
	vec2 gp = p * 3.42;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 13.09 - time * 7.20 + rnd * 6.2831853);
	vec3 col = palette(v * 0.69 + time * 0.15, vec3(0.44, 0.45, 0.53), vec3(0.47, 0.47, 0.43), vec3(0.75, 0.82, 1.27), vec3(0.10, 0.10, 0.70));
	col *= 0.50 + 0.38 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
