uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.87 - t * 2.76 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.49 + jf * 4.0), cos(t * 0.11 * jf)) * 0.65;
        xs += sin(length(p - im) * 72.88 - t * 10.42 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.60);
	float d = d1 * d2;
	vec3 col = palette(d * 0.64 + time * 0.04, vec3(0.45, 0.58, 0.44), vec3(0.34, 0.36, 0.33), vec3(0.70, 1.04, 1.27), vec3(0.46, 0.46, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
