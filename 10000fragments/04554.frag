uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 15.65 - t * 6.93 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 13.42 - t * 6.93 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.22;
	{ float fr = length(p); p *= 1.0 + 0.54 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.81, lr * 2.36 + time * -0.48); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.05, vec3(0.49, 0.46, 0.52), vec3(0.39, 0.42, 0.30), vec3(0.93, 1.38, 1.28), vec3(0.55, 0.60, 0.81));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
