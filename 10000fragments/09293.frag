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
        vec2 im = vec2(sin(t * 0.61 + jf * 4.0), cos(t * 0.42 * jf)) * 0.76;
        xs += sin(length(p - im) * 132.63 - t * 6.70 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.18 + t * 2.43 + ph) + sin(p.y * 3.68 - t * 2.43 + ph)
        + sin((p.x + p.y) * 5.54 + t * 2.43 + ph) + sin(length(p) * 14.84 - t * 2.43 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.98);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.30 + time * 0.15, vec3(0.41, 0.47, 0.41), vec3(0.43, 0.38, 0.33), vec3(1.02, 1.38, 1.28), vec3(0.06, 0.04, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
