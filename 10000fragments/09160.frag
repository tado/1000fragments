uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.76 + jf * 4.0), cos(t * 0.18 * jf)) * 1.00;
        xs += sin(length(p - im) * 215.96 - t * 6.08 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 1.50 * p.y + time * 1.66); p.y += 0.34 / wf * cos(wf * 2.37 * p.x + time * 1.62); }
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.76, length(p) * 3.29 - time * 0.17); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.77 + time * 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
