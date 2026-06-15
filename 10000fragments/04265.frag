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
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.38 + jf * 4.0), cos(t * 0.49 * jf)) * 0.73;
        xs += sin(length(p - im) * 168.63 - t * 12.03 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.28, t * 1.02 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -3.49 + time * 1.13) * p;
	p = rot2(time * 1.23) * p;
	{ float fr = length(p); p *= 1.0 + -0.59 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.73);
	float d = d1 * d2;
	vec3 col = palette(d * 0.84 + time * 0.22, vec3(0.44, 0.51, 0.43), vec3(0.46, 0.43, 0.47), vec3(1.16, 1.32, 1.14), vec3(0.69, 0.91, 1.00));
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
