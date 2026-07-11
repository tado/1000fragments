uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.05;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.17 * sin((time * 0.52) * 1.43), 0.40 + 0.21 * cos((time * 0.52) * 1.28));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.70);
	vec3 col = palette((v * 3.93) * 0.90 + (time * 0.52) * 0.22, vec3(0.47, 0.54, 0.48), vec3(0.19, 0.15, 0.19), vec3(0.61, 0.56, 0.50), vec3(0.53, 0.47, 0.97));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.923, 0.974, 1.051) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
