uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.64 - t * 7.99 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.72 + jf * 4.0), cos(t * 0.29 * jf)) * 0.51;
        xs += sin(length(p - im) * 138.06 - t * 5.41 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	p += vec2(0.61, -0.09) * sin(length(p) * 5.08 - time * 1.70) * 0.13;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.49 + time * 0.09, vec3(0.55, 0.47, 0.50), vec3(0.50, 0.45, 0.40), vec3(0.95, 0.90, 0.77), vec3(0.02, 0.68, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
