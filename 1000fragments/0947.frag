uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.66 + jf * 4.0), cos(t * 0.43 * jf)) * 0.48;
        xs += sin(length(p - im) * 190.71 - t * 4.13 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.30;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.59 * p.y + time * 1.53); p.y += 0.46 / wf * cos(wf * 1.58 * p.x + time * 1.10); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.07, vec3(0.43, 0.45, 0.48), vec3(0.47, 0.34, 0.31), vec3(1.30, 0.95, 0.80), vec3(0.14, 0.04, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
