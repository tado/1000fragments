uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	vec2 z = p;
	vec2 c = vec2(-0.68 + 0.10 * sin(time * 0.64), -0.09 + 0.23 * cos(time * 0.45));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.07, -0.41)));
	}
	float v = exp(-trap * 4.24);
	vec3 col = hue(v * 3.76 * 1.01 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
