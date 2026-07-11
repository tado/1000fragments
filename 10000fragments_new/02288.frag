uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.64);
    float gsh = hash21(vec2(grow, floor(t * 6.57))) - 0.5;
    float gx = p.x + gsh * 0.74;
    v = sin(gx * 7.58 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.19));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.x += sin(p.y * 6.76 + time * 2.79) * 0.19;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.34, lr * 2.22 + time * -0.78); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.99 * p.y + time * 1.21); p.y += 0.49 / wf * cos(wf * 1.53 * p.x + time * 1.39); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.74, 0.52, 0.40) * (0.20 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
