uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 14.27 - t * 4.56 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 36.06 - t * 4.56 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.31 + jf * 4.0), cos(t * 0.13 * jf)) * 0.69;
        xs += sin(length(p - im) * 63.71 - t * 5.15 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.20);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.32 + time * 0.04, vec3(0.56, 0.57, 0.52), vec3(0.47, 0.32, 0.49), vec3(0.91, 1.37, 1.06), vec3(0.14, 0.74, 0.89));
	col = fract(col * 1.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
