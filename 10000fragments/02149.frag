uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.87 + sr * 13.82 - t * 2.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.03, 0.08) * sin(length(p) * 3.57 - time * 1.88) * 0.16;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.95, lr * 2.86 + time * 0.69); }
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.10 + time * 0.17);
	col = mod(col * 2.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
