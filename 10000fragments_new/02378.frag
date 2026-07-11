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
        vec2 im = vec2(sin(t * 0.39 + jf * 4.0), cos(t * 0.39 * jf)) * 0.52;
        xs += sin(length(p - im) * 158.96 - t * 4.99 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.97;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.54; p = rot2(0.68) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.63, lr * 2.54 + time * 0.55); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.40, 0.51) * sin(length(p) * 4.16 - time * 1.12) * 0.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.10, vec3(0.58, 0.44, 0.41), vec3(0.34, 0.46, 0.49), vec3(1.01, 1.32, 1.37), vec3(0.54, 0.71, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
