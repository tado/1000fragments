uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.85 + jf * 4.0), cos(t * 0.37 * jf)) * 0.99;
        xs += sin(length(p - im) * 68.78 - t * 10.69 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.44; p = rot2(0.99) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.41) - 0.5;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.76 * p.y + time * 1.68); p.y += 0.40 / wf * cos(wf * 1.84 * p.x + time * 2.16); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.51, 0.48, 0.84) * (0.14 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
