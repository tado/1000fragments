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
        vec2 im = vec2(sin(t * 0.77 + jf * 4.0), cos(t * 0.56 * jf)) * 0.45;
        xs += sin(length(p - im) * 123.72 - t * 12.28 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.37, t * 1.47 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.68;
	p = rot2(p.y * -3.18 + time * 0.61) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.79);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.69 + time * 0.08, vec3(0.44, 0.49, 0.49), vec3(0.45, 0.31, 0.38), vec3(1.24, 0.93, 1.39), vec3(0.21, 0.02, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
