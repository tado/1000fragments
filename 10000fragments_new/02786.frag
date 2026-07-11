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
	vec2 c = vec2(-0.24 + 0.26 * sin(time * 1.25), -0.54 + 0.11 * cos(time * 1.27));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.93);
	vec3 col = hue(v * 3.20 * 0.76 + time * 0.14);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.97 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
