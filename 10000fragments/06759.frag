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
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.38 + jf * 4.0), cos(t * 0.34 * jf)) * 0.72;
        xs += sin(length(p - im) * 213.41 - t * 4.87 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.99, t * 0.90 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p *= 2.37;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.39; p = rot2(2.47) * p; }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.95);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.76 + time * 0.29, vec3(0.59, 0.49, 0.52), vec3(0.39, 0.49, 0.36), vec3(1.37, 1.17, 0.94), vec3(0.35, 0.25, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
