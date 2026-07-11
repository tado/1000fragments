uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	vec2 z = p;
	vec2 c = vec2(-0.40 + 0.22 * sin(time * 1.59), -0.57 + 0.13 * cos(time * 0.89));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.01);
	vec3 col = hue(v * 2.41 * 0.77 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
