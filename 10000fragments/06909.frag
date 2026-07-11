uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.93, t * 0.66 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	{ p = vec2(atan(p.y, p.x) * 2.75, length(p) * 3.58 - time * 0.68); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.50 * p.y + time * 1.61); p.y += 0.41 / wf * cos(wf * 1.96 * p.x + time * 1.48); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.22; p = rot2(0.80) * p; }
	p = rot2(time * -1.15) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.68 + time * 0.19);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
