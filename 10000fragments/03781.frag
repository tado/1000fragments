uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.70 + t * 1.36 + ph) + sin(p.y * 12.40 - t * 1.36 + ph)
        + sin((p.x + p.y) * 4.05 + t * 1.36 + ph) + sin(length(p) * 6.63 - t * 1.36 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.20 + jf * 4.0), cos(t * 0.32 * jf)) * 0.55;
        xs += sin(length(p - im) * 174.70 - t * 6.24 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.62;
	p += vec2(-0.51, 0.00) * sin(length(p) * 2.05 - time * 1.65) * 0.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.34);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.07 + time * 0.11, vec3(0.41, 0.59, 0.42), vec3(0.44, 0.45, 0.44), vec3(0.75, 0.93, 0.83), vec3(0.06, 0.58, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
