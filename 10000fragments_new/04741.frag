uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 27.96 - t * 7.62 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 31.71 - t * 2.99 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.23 + jf * 4.0), cos(t * 0.22 * jf)) * 0.39;
        xs += sin(length(p - im) * 145.68 - t * 13.04 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.35 + time * 0.19, vec3(0.60, 0.55, 0.59), vec3(0.39, 0.45, 0.42), vec3(1.12, 0.93, 0.73), vec3(0.32, 0.49, 0.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
