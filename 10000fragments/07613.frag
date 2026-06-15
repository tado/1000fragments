uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.45) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 3.28 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.35, lr * 1.99 + time * 0.46); }
	p = abs(p);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.14 * p.y + time * 1.53); p.y += 0.42 / wf * cos(wf * 3.91 * p.x + time * 0.69); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.66 + time * 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
