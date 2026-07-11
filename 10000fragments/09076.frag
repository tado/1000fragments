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
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.47 * jf)) * 0.33;
        xs += sin(length(p - im) * 126.46 - t * 11.19 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.72 - t * 5.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.36; p = rot2(1.49) * p; }
	{ float fr = length(p); p *= 1.0 + 0.47 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.37);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.04 + time * 0.13, vec3(0.46, 0.60, 0.57), vec3(0.35, 0.44, 0.33), vec3(0.93, 0.95, 1.06), vec3(0.11, 0.73, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
