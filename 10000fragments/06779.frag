uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.06, t * 0.69 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.40 + jf * 4.0), cos(t * 0.48 * jf)) * 0.84;
        xs += sin(length(p - im) * 194.16 - t * 6.30 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.58;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.58; p = rot2(2.44) * p; }
	p = fract(p * 1.94) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.40, length(p) * 4.99 - time * 0.63); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.53 + time * 0.06, vec3(0.54, 0.44, 0.46), vec3(0.31, 0.32, 0.46), vec3(0.90, 1.39, 1.25), vec3(0.10, 0.01, 0.02));
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
