uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	p = rot2(time * 0.55) * p;
	vec2 z = p;
	vec2 c = vec2(-0.84 + 0.09 * sin(time * 1.46), -0.60 + 0.24 * cos(time * 0.65));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.45, 0.37)));
	}
	float v = exp(-trap * 3.22);
	vec3 col = hue(v * 1.59 * 0.40 + time * 0.09);
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.46 + time * 16.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
