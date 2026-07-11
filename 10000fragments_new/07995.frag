uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	vec2 z = p;
	vec2 c = vec2(0.03 + 0.16 * sin(time * 1.38), 0.01 + 0.23 * cos(time * 1.41));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.03, 0.38)));
	}
	float v = exp(-trap * 4.58);
	vec3 col = hue(v * 1.75 * 0.46 + time * 0.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
