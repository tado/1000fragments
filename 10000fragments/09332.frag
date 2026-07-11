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
        vec2 im = vec2(sin(t * 0.97 + jf * 4.0), cos(t * 0.37 * jf)) * 0.87;
        xs += sin(length(p - im) * 164.05 - t * 4.80 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.58, lr * 1.33 + time * -0.18); }
	{ p = vec2(atan(p.y, p.x) * 1.58, length(p) * 2.40 - time * 0.44); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.47 + time * 0.11);
	col = mod(col * 1.49, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
