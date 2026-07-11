uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.58 + jf * 4.0), cos(t * 0.29 * jf)) * 0.31;
        xs += sin(length(p - im) * 80.62 - t * 7.93 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.96;
	{ float fr = length(p); p *= 1.0 + 0.33 * fr * fr; }
	p = rot2(1.93) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.77, lr * 1.36 + time * 0.31); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.10, vec3(0.46, 0.53, 0.55), vec3(0.43, 0.39, 0.31), vec3(1.11, 1.06, 0.90), vec3(0.60, 0.25, 0.96));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
