uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 16.25 - t * 2.23 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 22.99 - t * 2.23 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 2.57 * p.y + time * 1.35); p.y += 0.44 / wf * cos(wf * 2.73 * p.x + time * 1.26); }
	{ p = vec2(atan(p.y, p.x) * 1.07, length(p) * 2.52 - time * 0.54); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.27; p = rot2(1.23) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.21), field(p, time, 0.42));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
