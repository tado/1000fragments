uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.17 + t * 2.27 + ph) + sin(p.y * 7.10 - t * 2.27 + ph)
        + sin((p.x + p.y) * 5.27 + t * 2.27 + ph) + sin(length(p) * 15.00 - t * 2.27 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.74, lr * 1.32 + time * 0.74); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.49; p = rot2(2.08) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.35, 0.28, 0.48), vec3(0.51, 0.77, 0.89), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
