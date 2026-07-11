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
        vec2 im = vec2(sin(t * 0.84 + jf * 4.0), cos(t * 0.14 * jf)) * 0.50;
        xs += sin(length(p - im) * 196.17 - t * 11.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.09 + t * 4.90 + ph) + sin(p.y * 13.81 - t * 4.90 + ph)
        + sin((p.x + p.y) * 11.44 + t * 4.90 + ph) + sin(length(p) * 5.26 - t * 4.90 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.52 * fr * fr; }
	p = abs(p) - 0.57;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.30; p = rot2(2.00) * p; }
	p = rot2(p.y * 2.96 + time * 0.42) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.61);
	float d = d1 * d2;
	vec3 col = palette(d * 0.80 + time * 0.26, vec3(0.41, 0.44, 0.58), vec3(0.36, 0.42, 0.32), vec3(1.13, 0.72, 1.21), vec3(0.77, 0.56, 0.19));
	col = fract(col * 2.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
