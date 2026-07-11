uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.83 + t * 3.74 + ph) + sin(p.y * 5.28 - t * 3.74 + ph)
        + sin((p.x + p.y) * 7.73 + t * 3.74 + ph) + sin(length(p) * 9.64 - t * 3.74 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.62;
	p += vec2(0.94, -0.67) * sin(length(p) * 5.99 - time * 1.35) * 0.33;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.06, lr * 2.29 + time * 0.37); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.63 + time * 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
