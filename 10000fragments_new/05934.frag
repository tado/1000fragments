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
	p *= 0.92;
	p = rot2(time * -1.43) * p;
	vec2 gp = p * 6.41;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 28.16 - time * 7.35 + rnd * 6.2831853);
	vec3 col = palette(v * 1.21 + time * 0.29, vec3(0.59, 0.45, 0.54), vec3(0.34, 0.32, 0.30), vec3(1.29, 1.07, 0.84), vec3(0.95, 0.68, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
