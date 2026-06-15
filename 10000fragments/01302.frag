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
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.30 + jf * 4.0), cos(t * 0.49 * jf)) * 0.47;
        xs += sin(length(p - im) * 117.70 - t * 9.96 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.89, lr * 2.02 + time * 0.53); }
	p = rot2(2.72) * p;
	p = rot2(time * -1.32) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.73 + time * 0.13, vec3(0.51, 0.42, 0.60), vec3(0.41, 0.34, 0.39), vec3(1.07, 1.34, 0.88), vec3(0.66, 0.69, 0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
