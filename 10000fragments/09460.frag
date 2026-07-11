uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.72 + jf * 4.0), cos(t * 0.55 * jf)) * 0.98;
        xs += sin(length(p - im) * 183.71 - t * 8.15 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -2.47 + time * 0.16) * p;
	p += vec2(-0.21, 0.92) * sin(length(p) * 3.97 - time * 1.06) * 0.26;
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.12), field(p, time, 2.24));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
