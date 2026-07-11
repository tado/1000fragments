uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.35 + jf * 4.0), cos(t * 0.56 * jf)) * 0.72;
        xs += sin(length(p - im) * 144.18 - t * 11.58 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.95;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.39 * p.y + time * 0.72); p.y += 0.47 / wf * cos(wf * 3.87 * p.x + time * 1.89); }
	p = rot2(0.84) * p;
	p *= 2.53;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.05), field(p, time, 2.10));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
