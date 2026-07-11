uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.88 + jf * 4.0), cos(t * 0.18 * jf)) * 0.38;
        xs += sin(length(p - im) * 129.51 - t * 5.06 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 1.60 * p.y + time * 1.93); p.y += 0.34 / wf * cos(wf * 3.37 * p.x + time * 0.74); }
	p = fract(p * 1.20) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.73, lr * 2.87 + time * -0.68); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.95 + time * 0.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
