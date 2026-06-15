uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.84 + jf * 4.0), cos(t * 0.51 * jf)) * 0.81;
        xs += sin(length(p - im) * 166.57 - t * 7.18 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.53, lr * 1.70 + time * 0.74); }
	p = rot2(time * 0.97) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.81 * p.y + time * 1.75); p.y += 0.48 / wf * cos(wf * 2.62 * p.x + time * 0.62); }
	p = rot2(length(p) * 3.56 + time * 0.87) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.04, vec3(0.45, 0.46, 0.54), vec3(0.32, 0.42, 0.41), vec3(1.36, 0.84, 1.38), vec3(0.12, 0.51, 0.23));
	col = fract(col * 1.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
