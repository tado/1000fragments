uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.61 + jf * 4.0), cos(t * 0.13 * jf)) * 0.42;
        xs += sin(length(p - im) * 77.23 - t * 9.66 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.59 + 0.31 * pow(abs(cos(ra * 7.0 + t * 2.77)), 0.58);
    v = sin((rr - pet) * 18.31 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += sin(p.y * 2.40 + time * 2.55) * 0.16;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.81 + time * 0.01, vec3(0.56, 0.47, 0.45), vec3(0.35, 0.39, 0.42), vec3(0.81, 0.71, 1.38), vec3(0.33, 0.04, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
