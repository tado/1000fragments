uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.97 - t * 4.94 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 14.90 - t * 3.02 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 16.13 - t * 3.02 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.21;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.48, lr * 2.05 + time * -0.11); }
	{ float fr = length(p); p *= 1.0 + 0.58 * fr * fr; }
	p += vec2(0.37, 0.60) * sin(length(p) * 5.30 - time * 1.97) * 0.20;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.07 + time * 0.03, vec3(0.42, 0.54, 0.48), vec3(0.41, 0.34, 0.48), vec3(1.04, 1.24, 0.95), vec3(0.97, 0.61, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
