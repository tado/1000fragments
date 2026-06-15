uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.07 + sr * 7.58 - t * 4.89 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.54 + jf * 4.0), cos(t * 0.55 * jf)) * 0.48;
        xs += sin(length(p - im) * 194.08 - t * 11.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 2.23 + time * 0.30) * p;
	p += vec2(-0.51, -0.65) * sin(length(p) * 4.79 - time * 1.95) * 0.19;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.61, lr * 1.56 + time * 0.64); }
	p = rot2(time * 0.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.97 + time * 0.30, vec3(0.50, 0.43, 0.44), vec3(0.32, 0.40, 0.40), vec3(0.91, 1.02, 0.89), vec3(0.69, 0.61, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
