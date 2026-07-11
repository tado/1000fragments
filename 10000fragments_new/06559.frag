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
	p *= 2.25;
	p = rot2(time * -0.93) * p;
	vec2 gp = p * 5.81;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.15 - 0.18 * sin(time * 4.16 + rnd * 6.2831853)) * 16.45);
	vec3 col = palette(v * 0.40 + time * 0.13, vec3(0.46, 0.48, 0.59), vec3(0.33, 0.44, 0.36), vec3(0.73, 1.27, 1.22), vec3(0.64, 0.12, 0.45));
	col *= 0.67 + 0.47 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
