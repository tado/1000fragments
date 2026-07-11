uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.53 + t * 5.29 + ph) + sin(p.y * 10.08 - t * 2.86 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 27.91 - t * 5.73 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 11.96 - t * 5.73 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.17; p = rot2(1.95) * p; }
	p = rot2(length(p) * 1.95 + time * 0.48) * p;
	p = rot2(time * -1.27) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 2.87 + time * -0.71); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.59);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.06 + time * 0.25, vec3(0.47, 0.48, 0.52), vec3(0.37, 0.43, 0.42), vec3(1.39, 0.96, 0.70), vec3(0.20, 0.55, 0.30));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
