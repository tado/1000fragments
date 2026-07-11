uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.30 + t * 5.42 + ph) + sin(p.y * 9.95 - t * 2.01 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.90 + jf * 4.0), cos(t * 0.44 * jf)) * 0.55;
        xs += sin(length(p - im) * 142.48 - t * 13.67 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.99;
	{ float fr = length(p); p *= 1.0 + -0.33 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.42);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.60 + time * 0.24, vec3(0.46, 0.59, 0.50), vec3(0.48, 0.37, 0.33), vec3(1.32, 0.71, 1.13), vec3(0.74, 0.16, 0.81));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.46 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
