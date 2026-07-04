uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.93 + jf * 4.0), cos(t * 0.16 * jf)) * 0.49;
        xs += sin(length(p - im) * 167.80 - t * 11.45 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.29, lr * 2.92 + time * 0.66); }
	p = rot2(length(p) * -3.90 + time * 0.64) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.28, 0.36), vec3(0.65, 0.94, 0.90), d);
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
