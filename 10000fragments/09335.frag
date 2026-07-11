uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.96 + jf * 4.0), cos(t * 0.50 * jf)) * 0.59;
        xs += sin(length(p - im) * 173.26 - t * 5.02 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.48 + t * 0.52 + ph) + sin(p.y * 12.07 - t * 0.52 + ph)
        + sin((p.x + p.y) * 10.52 + t * 0.52 + ph) + sin(length(p) * 17.98 - t * 0.52 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.67);
	float d = d1 + d2;
	vec3 col = palette(d * 0.88 + time * 0.21, vec3(0.51, 0.55, 0.48), vec3(0.33, 0.39, 0.47), vec3(1.06, 0.80, 1.14), vec3(0.95, 0.34, 0.42));
	col = fract(col * 2.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
