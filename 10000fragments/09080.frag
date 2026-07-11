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
        vec2 im = vec2(sin(t * 0.98 + jf * 4.0), cos(t * 0.30 * jf)) * 0.68;
        xs += sin(length(p - im) * 209.05 - t * 11.67 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.23 - t * 6.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.90);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.79 + time * 0.02, vec3(0.53, 0.48, 0.49), vec3(0.38, 0.36, 0.37), vec3(1.32, 1.25, 1.37), vec3(0.27, 0.60, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
