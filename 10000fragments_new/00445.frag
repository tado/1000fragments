uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.88 + jf * 4.0), cos(t * 0.39 * jf)) * 0.71;
        xs += sin(length(p - im) * 81.33 - t * 12.69 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.29, lr * 1.84 + time * -0.35); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.50 + time * 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
