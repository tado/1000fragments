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
        vec2 im = vec2(sin(t * 0.32 + jf * 4.0), cos(t * 0.27 * jf)) * 0.67;
        xs += sin(length(p - im) * 64.97 - t * 6.64 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	p = rot2(time * -0.74) * p;
	{ p = vec2(atan(p.y, p.x) * 1.70, length(p) * 5.56 - time * 0.66); }
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	p = fract(p * 2.82) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.01 + time * 0.13, vec3(0.48, 0.45, 0.58), vec3(0.35, 0.33, 0.39), vec3(1.38, 1.23, 1.23), vec3(0.05, 0.11, 0.73));
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
