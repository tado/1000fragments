uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.95 + t * 0.79 + ph) + sin(p.y * 2.57 - t * 0.79 + ph)
        + sin((p.x + p.y) * 4.29 + t * 0.79 + ph) + sin(length(p) * 6.06 - t * 0.79 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.23 + jf * 4.0), cos(t * 0.20 * jf)) * 0.74;
        xs += sin(length(p - im) * 75.28 - t * 5.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.40);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.79 + time * 0.11, vec3(0.49, 0.44, 0.42), vec3(0.50, 0.33, 0.35), vec3(0.93, 0.76, 0.99), vec3(0.52, 0.53, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
