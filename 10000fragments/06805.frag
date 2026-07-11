uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.23, t * 1.68 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.56 * fr * fr; }
	p = abs(p) - 0.52;
	p = rot2(2.14) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.64 * p.y + time * 0.75); p.y += 0.49 / wf * cos(wf * 3.69 * p.x + time * 1.53); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.79 + time * 0.18);
	col = mod(col * 1.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
