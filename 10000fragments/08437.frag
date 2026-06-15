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
        vec2 im = vec2(sin(t * 0.13 + jf * 4.0), cos(t * 0.48 * jf)) * 0.79;
        xs += sin(length(p - im) * 168.33 - t * 11.05 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	{ p = vec2(atan(p.y, p.x) * 1.97, length(p) * 3.14 - time * 0.66); }
	p = rot2(p.y * 3.42 + time * 0.19) * p;
	p = abs(p) - 0.27;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.62, lr * 1.59 + time * 0.42); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.12, vec3(0.43, 0.48, 0.51), vec3(0.32, 0.41, 0.42), vec3(1.17, 0.87, 1.11), vec3(0.53, 0.41, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
