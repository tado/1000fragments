uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.41;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 23.64 - t * 1.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 3.99 * p.y + time * 1.36); p.y += 0.41 / wf * cos(wf * 3.40 * p.x + time * 0.83); }
	{ float fr = length(p); p *= 1.0 + 0.61 * fr * fr; }
	p.x += sin(p.y * 7.09 + time * 2.47) * 0.36;
	p = rot2(time * -1.48) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.18 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
