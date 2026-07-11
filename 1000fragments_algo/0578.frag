uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.06;
	p *= 2.15;
	vec2 z = p;
	vec2 c = vec2(-0.35 + 0.08 * sin((time * 0.78) * 0.72), 0.25 + 0.12 * cos((time * 0.78) * 1.53));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.33, -0.12)));
	}
	float v = exp(-trap * 5.61);
	vec3 col = palette((v * 1.77) * 0.73 + (time * 0.78) * 0.09, vec3(0.33, 0.33, 0.41), vec3(0.22, 0.14, 0.20), vec3(0.45, 0.61, 0.86), vec3(0.06, 0.06, 0.96));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.78)) * 100.0) - 0.5) * 0.12;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.009, 0.981, 1.017) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
