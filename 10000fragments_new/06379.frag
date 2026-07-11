uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	p = rot2(time * 1.46) * p;
	vec2 gp = p * 7.34;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.22 - 0.16 * sin(time * 5.90 + rnd * 6.2831853)) * 18.27);
	vec3 col = hue(v * 0.61 + time * 0.34);
	col *= 0.57 + 0.45 * hash21(id + 11.0);
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 2.06 + time * 8.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
