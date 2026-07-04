uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.76);
    float gsh = hash21(vec2(grow, floor(t * 7.70))) - 0.5;
    float gx = p.x + gsh * 0.65;
    v = sin(gx * 15.67 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.57));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.47 * p.y + time * 2.10); p.y += 0.39 / wf * cos(wf * 3.01 * p.x + time * 1.40); }
	p.y += sin(p.x * 4.09 + time * 2.90) * 0.17;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.87, lr * 1.56 + time * 0.96); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.20, vec3(0.50, 0.53, 0.43), vec3(0.45, 0.31, 0.43), vec3(1.11, 1.12, 0.94), vec3(0.99, 0.35, 0.65));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
