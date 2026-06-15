uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.17 + jf * 4.0), cos(t * 0.21 * jf)) * 0.88;
        xs += sin(length(p - im) * 120.68 - t * 8.95 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.51 + sr * 15.34 - t * 2.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.46);
	float d = d1 + d2;
	vec3 col = palette(d * 1.42 + time * 0.03, vec3(0.42, 0.53, 0.55), vec3(0.41, 0.35, 0.34), vec3(0.77, 1.08, 1.20), vec3(0.03, 0.04, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
