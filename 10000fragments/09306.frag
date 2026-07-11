uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.83 + jf * 4.0), cos(t * 0.15 * jf)) * 0.87;
        xs += sin(length(p - im) * 211.76 - t * 4.81 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.33, t * 1.61 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.58);
	float d = d1 * d2;
	vec3 col = palette(d * 0.70 + time * 0.06, vec3(0.50, 0.59, 0.51), vec3(0.41, 0.44, 0.30), vec3(1.23, 1.15, 1.19), vec3(0.72, 0.65, 0.15));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
