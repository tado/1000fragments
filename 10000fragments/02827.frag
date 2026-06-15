uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.69 + jf * 4.0), cos(t * 0.29 * jf)) * 0.59;
        xs += sin(length(p - im) * 70.78 - t * 12.83 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.11;
	p = rot2(0.85) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 1.74 * p.y + time * 0.94); p.y += 0.43 / wf * cos(wf * 3.02 * p.x + time * 0.75); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.58; p = rot2(2.60) * p; }
	p *= 1.41;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.41), field(p, time, 0.83));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
