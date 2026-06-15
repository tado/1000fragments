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
        vec2 im = vec2(sin(t * 0.64 + jf * 4.0), cos(t * 0.57 * jf)) * 0.84;
        xs += sin(length(p - im) * 215.95 - t * 9.51 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.29 * sin(mf + 3.0) + ph), cos(t * 2.29 * cos(mf + 3.0) + ph));
        ms += 0.037 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	p = rot2(time * -1.05) * p;
	p = fract(p * 1.08) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.81);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.40 + time * 0.04, vec3(0.46, 0.53, 0.52), vec3(0.38, 0.34, 0.50), vec3(0.77, 1.13, 1.15), vec3(0.63, 0.76, 0.46));
	col = fract(col * 1.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
