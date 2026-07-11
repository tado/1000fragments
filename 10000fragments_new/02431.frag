uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.65 + jf * 4.0), cos(t * 0.37 * jf)) * 0.90;
        xs += sin(length(p - im) * 185.03 - t * 4.95 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.90 * p.y + time * 1.93); p.y += 0.33 / wf * cos(wf * 3.03 * p.x + time * 0.60); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.44 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
