uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.11 + jf * 4.0), cos(t * 0.21 * jf)) * 0.65;
        xs += sin(length(p - im) * 197.38 - t * 5.50 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.49 + t * 0.68 + ph) + sin(p.y * 2.59 - t * 1.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.70;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * -0.99) * q1;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.26, lr * 1.47 + time * 0.99); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.86);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.31 + time * 0.37, vec3(0.58, 0.40, 0.48), vec3(0.32, 0.38, 0.43), vec3(1.13, 0.99, 1.15), vec3(0.79, 0.53, 0.39));
	col = clamp((col - 0.5) * 1.47 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
