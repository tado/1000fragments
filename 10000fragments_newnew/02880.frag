uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.53) - 0.5;
    float rad = 0.45 + 0.12 * sin(t * 1.17 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.55 + jf * 4.0), cos(t * 0.57 * jf)) * 0.49;
        xs += sin(length(p - im) * 118.31 - t * 13.20 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.38;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.45, lr * 1.86 + time * -0.27); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = (floor(p * 19.1) + 0.5) / 19.1;
	p = rot2(length(p) * 3.40 + time * 0.62) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.92);
	float d = d1 + d2;
	vec3 col = palette(d * 0.60 + time * 0.11, vec3(0.43, 0.48, 0.56), vec3(0.34, 0.46, 0.34), vec3(1.36, 1.03, 1.08), vec3(0.87, 0.13, 0.92));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.22 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
