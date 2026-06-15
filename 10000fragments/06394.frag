uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.52 + jf * 4.0), cos(t * 0.55 * jf)) * 0.78;
        xs += sin(length(p - im) * 94.04 - t * 13.75 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.87;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.40 * p.y + time * 1.59); p.y += 0.39 / wf * cos(wf * 3.07 * p.x + time * 0.66); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.40, lr * 1.68 + time * -0.24); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.28, vec3(0.50, 0.42, 0.43), vec3(0.34, 0.31, 0.45), vec3(0.72, 1.34, 1.37), vec3(0.23, 0.75, 1.00));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
