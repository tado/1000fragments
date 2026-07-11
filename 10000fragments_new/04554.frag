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
	p *= 1.08;
	p = rot2(time * 0.91) * p;
	vec2 gp = p * 2.61;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 14.89 - time * 5.73 + rnd * 6.2831853);
	vec3 col = palette(v * 1.39 + time * 0.39, vec3(0.58, 0.51, 0.42), vec3(0.38, 0.50, 0.37), vec3(0.86, 1.22, 0.99), vec3(0.18, 0.96, 0.42));
	col *= 0.66 + 0.45 * hash21(id + 11.0);
	col = fract(col * 1.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
