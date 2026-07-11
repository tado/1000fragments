uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.16 + t * 2.79 + ph) + sin(p.y * 11.99 - t * 2.34 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.20;
	{ float fr = length(p); p *= 1.0 + 0.34 * fr * fr; }
	p.y += sin(p.x * 6.92 + time * 3.03) * 0.28;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.68, lr * 2.44 + time * 0.81); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.32, 0.50, 0.39), vec3(0.66, 0.68, 0.60), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
