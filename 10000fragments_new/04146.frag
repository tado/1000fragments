uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.81 + jf * 4.0), cos(t * 0.40 * jf)) * 0.76;
        xs += sin(length(p - im) * 184.42 - t * 7.60 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	p = rot2(p.y * -2.12 + time * 0.35) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.04, lr * 1.28 + time * 0.94); }
	p += vec2(0.16, 0.96) * sin(length(p) * 2.45 - time * 2.46) * 0.15;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.32, 0.94, 0.21) * (0.17 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
