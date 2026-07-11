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
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.93 + jf * 4.0), cos(t * 0.18 * jf)) * 0.86;
        xs += sin(length(p - im) * 77.13 - t * 12.68 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.89;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.68; kp = rot2(1.82) * kp; kp *= 1.36; }
    v = sin(kp.x * 1.89 - t * 3.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -2.70 + time * 0.39) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.28);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.80 + time * 0.01, vec3(0.42, 0.43, 0.54), vec3(0.33, 0.45, 0.45), vec3(1.38, 1.28, 0.73), vec3(0.53, 0.56, 0.54));
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 2.12 + time * 6.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
