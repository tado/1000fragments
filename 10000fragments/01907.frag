uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.99; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 21.28 - t * 3.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.74, lr * 1.10 + time * -0.22); }
	{ p = vec2(atan(p.y, p.x) * 2.53, length(p) * 2.85 - time * 0.81); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 1.89 * p.y + time * 1.68); p.y += 0.34 / wf * cos(wf * 3.15 * p.x + time * 1.50); }
	p = rot2(length(p) * 2.93 + time * 1.30) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.49), field(p, time, 0.97));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
