uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.79 + jf * 4.0), cos(t * 0.45 * jf)) * 0.40;
        xs += sin(length(p - im) * 193.40 - t * 5.49 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.45; p = rot2(1.59) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.06, lr * 1.31 + time * 0.12); }
	p += vec2(-0.10, 0.65) * sin(length(p) * 4.21 - time * 1.47) * 0.33;
	p = rot2(1.71) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.13, 0.31, 0.30), vec3(0.74, 0.95, 0.61), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
