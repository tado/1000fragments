uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.94 * sin(mf + 3.0) + ph), cos(t * 1.94 * cos(mf + 3.0) + ph));
        ms += 0.070 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.44 + jf * 4.0), cos(t * 0.23 * jf)) * 0.55;
        xs += sin(length(p - im) * 204.76 - t * 13.53 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.58;
	p += vec2(0.62, -0.30) * sin(length(p) * 2.57 - time * 0.72) * 0.25;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.56; p = rot2(2.01) * p; }
	p = rot2(time * -0.29) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.14);
	float d = d1 * d2;
	vec3 col = palette(d * 0.53 + time * 0.25, vec3(0.51, 0.43, 0.42), vec3(0.33, 0.37, 0.34), vec3(1.38, 0.98, 1.16), vec3(0.61, 0.12, 0.58));
	col = clamp((col - 0.5) * 1.40 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
