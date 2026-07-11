uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.13 + jf * 4.0), cos(t * 0.44 * jf)) * 0.46;
        xs += sin(length(p - im) * 154.92 - t * 10.02 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.54, length(p) * 4.73 - time * 0.55); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.55, lr * 1.65 + time * -0.51); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.17, vec3(0.53, 0.56, 0.57), vec3(0.42, 0.37, 0.33), vec3(0.97, 1.08, 0.98), vec3(0.62, 0.23, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
