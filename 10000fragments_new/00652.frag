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
	p *= 1.29;
	p = rot2(time * -1.38) * p;
	vec2 gp = p * 6.80;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 18.26 - time * 3.45 + rnd * 6.2831853);
	vec3 col = palette(v * 0.70 + time * 0.23, vec3(0.49, 0.46, 0.53), vec3(0.43, 0.42, 0.43), vec3(0.77, 0.87, 0.86), vec3(0.77, 0.96, 0.70));
	col *= 0.67 + 0.33 * hash21(id + 11.0);
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 2.90 + time * 16.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
