uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 21.29 - t * 2.52 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 14.25 - t * 2.52 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.74 + jf * 4.0), cos(t * 0.59 * jf)) * 0.78;
        xs += sin(length(p - im) * 105.79 - t * 11.95 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.94);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.20 + time * 0.27, vec3(0.40, 0.55, 0.53), vec3(0.36, 0.40, 0.30), vec3(1.29, 1.08, 0.86), vec3(0.66, 0.00, 0.31));
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
