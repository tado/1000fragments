uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 14.45 - t * 5.56 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 9.90 - t * 6.79 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.13 + jf * 4.0), cos(t * 0.23 * jf)) * 0.65;
        xs += sin(length(p - im) * 201.47 - t * 10.36 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += sin(p.y * 2.25 + time * 1.14) * 0.35;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.75;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.12);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.69 + time * 0.04, vec3(0.53, 0.48, 0.53), vec3(0.35, 0.50, 0.46), vec3(1.03, 1.28, 1.01), vec3(0.98, 0.22, 0.17));
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
