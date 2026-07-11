uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.16) * p;
	vec2 gp = p * 7.37;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 22.07 - time * 2.02 + rnd * 6.2831853);
	vec3 col = palette(v * 0.77 + time * 0.38, vec3(0.58, 0.50, 0.60), vec3(0.37, 0.46, 0.32), vec3(1.35, 1.36, 0.77), vec3(0.08, 0.04, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
