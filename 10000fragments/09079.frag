uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 39.50 - t * 2.46 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 24.26 - t * 2.46 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.22 + jf * 4.0), cos(t * 0.48 * jf)) * 0.43;
        xs += sin(length(p - im) * 133.17 - t * 12.44 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.28;
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.34);
	float d = d1 * d2;
	vec3 col = palette(d * 1.48 + time * 0.25, vec3(0.42, 0.46, 0.50), vec3(0.46, 0.36, 0.41), vec3(0.74, 1.17, 1.15), vec3(0.09, 0.86, 0.54));
	col = mod(col * 1.44, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
