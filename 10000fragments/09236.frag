uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.41 + jf * 4.0), cos(t * 0.25 * jf)) * 0.80;
        xs += sin(length(p - im) * 194.96 - t * 12.86 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.98;
	p = rot2(p.y * -2.07 + time * 0.37) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 2.83 * p.y + time * 1.86); p.y += 0.27 / wf * cos(wf * 2.25 * p.x + time * 0.92); }
	{ p = vec2(atan(p.y, p.x) * 1.26, length(p) * 4.14 - time * 0.45); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.11, 0.16), vec3(0.97, 0.73, 0.48), d);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
