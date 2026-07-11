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
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.15 + jf * 4.0), cos(t * 0.54 * jf)) * 0.46;
        xs += sin(length(p - im) * 63.84 - t * 4.25 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.89;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.59, lr * 1.15 + time * 0.67); }
	{ p = vec2(atan(p.y, p.x) * 1.24, length(p) * 3.65 - time * 0.26); }
	p = rot2(1.04) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.15, vec3(0.50, 0.59, 0.59), vec3(0.38, 0.43, 0.48), vec3(1.35, 0.91, 1.09), vec3(0.78, 0.45, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
