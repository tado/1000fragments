uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.44 + t * 2.66 + ph) + sin(p.y * 9.01 - t * 2.66 + ph)
        + sin((p.x + p.y) * 5.76 + t * 2.66 + ph) + sin(length(p) * 10.55 - t * 2.66 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.99 + jf * 4.0), cos(t * 0.60 * jf)) * 0.36;
        xs += sin(length(p - im) * 151.19 - t * 9.84 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.96);
	float d = d1 + d2;
	vec3 col = palette(d * 1.65 + time * 0.21, vec3(0.43, 0.57, 0.43), vec3(0.39, 0.44, 0.43), vec3(0.78, 0.87, 0.74), vec3(0.24, 0.31, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
