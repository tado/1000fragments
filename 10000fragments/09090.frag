uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.15 + t * 2.65 + ph) + sin(p.y * 5.94 - t * 4.31 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.38 + jf * 4.0), cos(t * 0.18 * jf)) * 0.34;
        xs += sin(length(p - im) * 202.36 - t * 6.92 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	p = rot2(1.85) * p;
	p += vec2(-0.66, 0.30) * sin(length(p) * 5.36 - time * 0.80) * 0.34;
	{ p = vec2(atan(p.y, p.x) * 2.56, length(p) * 2.81 - time * 0.41); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.69, lr * 1.41 + time * -0.71); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.70);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.03 + time * 0.08, vec3(0.42, 0.54, 0.48), vec3(0.49, 0.41, 0.42), vec3(0.99, 0.80, 1.34), vec3(0.12, 0.12, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
