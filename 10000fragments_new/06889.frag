uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.02) * p;
	vec2 gp = p * 5.33;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 17.21 - time * 3.43 + rnd * 6.2831853);
	vec3 col = palette(v * 0.54 + time * 0.36, vec3(0.55, 0.55, 0.57), vec3(0.42, 0.38, 0.42), vec3(1.37, 0.91, 0.71), vec3(0.80, 0.25, 0.85));
	col = fract(col * 1.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
