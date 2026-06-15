uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.29 * jf)) * 0.64;
        xs += sin(length(p - im) * 194.26 - t * 7.26 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.67, t * 1.85 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.86, length(p) * 3.55 - time * 0.55); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.81);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.66 + time * 0.04, vec3(0.59, 0.46, 0.51), vec3(0.47, 0.35, 0.50), vec3(0.83, 1.37, 1.33), vec3(0.56, 0.95, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
