uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 38.23 - t * 6.61 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 11.31 - t * 6.61 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	{ p = vec2(atan(p.y, p.x) * 2.05, length(p) * 3.61 - time * 0.71); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.30, lr * 1.10 + time * 0.56); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.06, vec3(0.58, 0.44, 0.44), vec3(0.44, 0.33, 0.34), vec3(1.23, 1.26, 1.30), vec3(0.85, 0.70, 0.47));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
