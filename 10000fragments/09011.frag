uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.97 + jf * 4.0), cos(t * 0.53 * jf)) * 0.42;
        xs += sin(length(p - im) * 81.90 - t * 6.99 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.18, lr * 2.35 + time * -0.77); }
	p = fract(p * 1.66) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.22, vec3(0.40, 0.41, 0.44), vec3(0.40, 0.46, 0.49), vec3(1.02, 1.25, 1.22), vec3(0.67, 0.13, 0.64));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
