uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.65 * sin(t * 1.02) + t * 3.82 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.86 * p.y + time * 1.91); p.y += 0.21 / wf * cos(wf * 2.62 * p.x + time * 1.84); }
	p += vec2(-0.33, 0.90) * sin(length(p) * 5.19 - time * 2.35) * 0.22;
	{ p = vec2(atan(p.y, p.x) * 2.82, length(p) * 3.70 - time * 0.71); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.47; p = rot2(2.21) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.04), field(p, time, 2.08));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
