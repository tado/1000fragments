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
        vec2 im = vec2(sin(t * 0.71 + jf * 4.0), cos(t * 0.40 * jf)) * 0.41;
        xs += sin(length(p - im) * 103.46 - t * 9.00 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.70, t * 2.02 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.09;
	p = rot2(time * 0.97) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.60; p = rot2(0.82) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.77, length(p) * 2.06 - time * 0.47); }
	{ float fr = length(p); p *= 1.0 + 0.66 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.92);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.32 + time * 0.21, vec3(0.46, 0.58, 0.60), vec3(0.42, 0.30, 0.31), vec3(1.08, 1.19, 1.38), vec3(0.25, 0.95, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
