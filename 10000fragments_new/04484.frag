uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	p = rot2(time * 0.85) * p;
	vec2 z = p;
	vec2 c = vec2(-0.46 + 0.11 * sin(time * 1.11), -0.21 + 0.05 * cos(time * 0.89));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.46, 0.00)));
	}
	float v = exp(-trap * 5.14);
	vec3 col = hue(v * 1.78 * 1.10 + time * 0.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
