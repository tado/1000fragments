uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.34 - t * 1.99;
    v = sin(floor(lv * 2.1) / 2.1 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.54, lr * 1.39 + time * -0.75); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.19, 0.05, 0.53), vec3(0.80, 0.58, 0.41), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
