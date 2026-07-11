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
        vec2 im = vec2(sin(t * 0.43 + jf * 4.0), cos(t * 0.23 * jf)) * 0.81;
        xs += sin(length(p - im) * 168.77 - t * 7.72 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.22 * sin(mf + 3.0) + ph), cos(t * 2.22 * cos(mf + 3.0) + ph));
        ms += 0.091 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.11;
	p = rot2(p.y * -1.49 + time * 0.91) * p;
	p = fract(p * 1.63) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.15);
	float d = d1 * d2;
	vec3 col = palette(d * 1.75 + time * 0.12, vec3(0.57, 0.47, 0.45), vec3(0.39, 0.46, 0.37), vec3(0.86, 1.21, 1.29), vec3(0.70, 0.47, 0.28));
	col = mod(col * 1.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
