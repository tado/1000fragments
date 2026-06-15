uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.49 + t * 3.00 + ph) + sin(p.y * 11.22 - t * 2.86 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	p = fract(p * 3.00) - 0.5;
	p *= 1.69;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.21, 0.03), vec3(0.52, 1.00, 0.94), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
