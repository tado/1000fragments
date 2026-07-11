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
        vec2 im = vec2(sin(t * 0.92 + jf * 4.0), cos(t * 0.42 * jf)) * 0.43;
        xs += sin(length(p - im) * 152.03 - t * 13.27 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.13; p = rot2(2.41) * p; }
	{ float fr = length(p); p *= 1.0 + 0.68 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.22, vec3(0.51, 0.60, 0.47), vec3(0.48, 0.47, 0.39), vec3(0.80, 0.78, 1.38), vec3(0.88, 0.14, 0.47));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
