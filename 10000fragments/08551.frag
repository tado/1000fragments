uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	p = rot2(time * 0.54) * p;
	vec2 z = p;
	vec2 c = vec2(-0.15 + 0.17 * sin(time * 1.39), -0.54 + 0.28 * cos(time * 0.48));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.38);
	vec3 col = hue(v * 3.59 * 1.41 + time * 0.05);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.66 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
