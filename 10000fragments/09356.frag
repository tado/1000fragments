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
        vec2 im = vec2(sin(t * 0.45 + jf * 4.0), cos(t * 0.42 * jf)) * 0.40;
        xs += sin(length(p - im) * 201.22 - t * 12.89 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.70 - t * 3.72 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.96 + time * 0.81) * p;
	p = rot2(time * -0.69) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.09, lr * 1.45 + time * 0.16); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.25);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.48 + time * 0.07, vec3(0.56, 0.54, 0.42), vec3(0.31, 0.44, 0.48), vec3(1.00, 1.05, 0.90), vec3(0.88, 0.40, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
