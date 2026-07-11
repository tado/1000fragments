uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.90 + jf * 4.0), cos(t * 0.34 * jf)) * 0.51;
        xs += sin(length(p - im) * 181.99 - t * 5.08 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += sin(p.y * 6.20 + time * 3.32) * 0.11;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.24 * p.y + time * 1.94); p.y += 0.37 / wf * cos(wf * 2.16 * p.x + time * 1.52); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.30, lr * 1.12 + time * 0.21); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.12, vec3(0.52, 0.56, 0.45), vec3(0.36, 0.42, 0.30), vec3(1.32, 1.03, 0.75), vec3(0.31, 0.35, 0.88));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
