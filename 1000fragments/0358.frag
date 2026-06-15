uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.69 + jf * 4.0), cos(t * 0.44 * jf)) * 0.86;
        xs += sin(length(p - im) * 142.11 - t * 10.19 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 1.83 * p.y + time * 2.00); p.y += 0.40 / wf * cos(wf * 2.82 * p.x + time * 1.54); }
	p = fract(p * 2.77) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.12, vec3(0.53, 0.41, 0.55), vec3(0.48, 0.48, 0.42), vec3(1.40, 1.21, 1.09), vec3(0.28, 0.96, 0.30));
	col = fract(col * 2.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
