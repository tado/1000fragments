uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.21 * cos(sa * 5 + t * 1.28 + ph);
    v = sin((sr - petal) * 7.94);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 2.76 * p.y + time * 1.42); p.y += 0.36 / wf * cos(wf * 1.60 * p.x + time * 1.96); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.59; p = rot2(0.73) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.61), field(p, time, 1.21));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
