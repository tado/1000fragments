uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 6.99;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 14.13 + rnd * 6.2831853 + (time * 0.62) * 4.87);
	vec3 col = palette((v) * 0.58 + (time * 0.62) * 0.08, vec3(0.34, 0.38, 0.39), vec3(0.18, 0.18, 0.13), vec3(0.70, 0.90, 0.87), vec3(0.93, 0.94, 0.18));
	col *= 0.53 + 0.39 * hash21(id + 11.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.62)) * 100.0) - 0.5) * 0.09;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.953, 1.010, 0.944) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
