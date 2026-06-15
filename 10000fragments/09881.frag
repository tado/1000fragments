uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.37 + jf * 4.0), cos(t * 0.30 * jf)) * 0.85;
        xs += sin(length(p - im) * 63.58 - t * 8.58 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.94;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.83, lr * 2.54 + time * -0.49); }
	{ p = vec2(atan(p.y, p.x) * 2.84, length(p) * 5.14 - time * 0.66); }
	p = rot2(time * 1.14) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.71, 1.04, 0.63) + vec3(0.09, 0.08, 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
