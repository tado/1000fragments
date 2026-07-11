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
        vec2 im = vec2(sin(t * 0.35 + jf * 4.0), cos(t * 0.39 * jf)) * 0.41;
        xs += sin(length(p - im) * 130.25 - t * 9.29 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.89, t * 0.77 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.58);
	float d = d1 + d2;
	vec3 col = palette(d * 0.58 + time * 0.19, vec3(0.50, 0.45, 0.55), vec3(0.36, 0.48, 0.40), vec3(0.83, 0.96, 0.83), vec3(0.81, 0.93, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
