uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.80 + jf * 4.0), cos(t * 0.18 * jf)) * 0.73;
        xs += sin(length(p - im) * 72.55 - t * 10.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.53, lr * 1.86 + time * 0.40); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 1.55 * p.y + time * 1.79); p.y += 0.50 / wf * cos(wf * 3.33 * p.x + time * 0.97); }
	p = rot2(p.y * -2.68 + time * 0.99) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.72, 0.19, 0.62) * (0.08 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
